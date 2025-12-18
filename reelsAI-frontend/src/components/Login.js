import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [signInForm, setsignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    //Validate the form data
    let message;

    if (signInForm) {
      // 🔹 Sign In: validate only email & password
      message = checkValidData(email.current.value, password.current.value);
    } else {
      // 🔹 Sign Up: validate name, email, password
      message = checkValidData(
        email.current.value,
        password.current.value,
        name.current.value,
        true
      );
    }
    setErrorMessage(message);

    if (message) return;
    if (!signInForm) {
      //Proceed with sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {})
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Proceed with sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          const { uid, displayName, email } = auth.currentUser;
          dispatch(
            addUser({
              uid: uid,
              displayName: displayName,
              email: email,
            })
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setsignInForm(!signInForm);
  };
  return (
    <div>
      <Header />
      {/* Safe gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#374151] via-[#111827] to-black" />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black/80 w-full md:w-3/12 my-36 mx-auto left-0 right-0 text-white"
      >
        <h1 className="font-bold text-3xl pb-8 px-2">
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!signInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 m-2 w-full rounded-sm text-white bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="p-2 m-2 w-full rounded-sm text-white bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 w-full rounded-sm bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2 pl-2">
          {errorMessage}
        </p>
        <button
          className="py-2 m-2 bg-red-400 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {signInForm ? "Sign In" : "Sign Up"}
        </button>
        <h2 className="py-2 mx-2 cursor-pointer" onClick={toggleSignInForm}>
          <span className="text-gray-300 ">New To Reels AI ? </span>
          <span className="font-bold">
            {signInForm ? "Sign Up Now" : "Already Registerd? Sign In Now"}
          </span>
        </h2>
      </form>
    </div>
  );
};

export default Login;
