import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute px-8 py-2 w-screen bg-gradient-to-b from-black flex justify-between items-center flex-row">
      <img className="w-44" src={LOGO} alt="logo"></img>
      {user && (
        <div className="flex">
          <img src={user?.photoURL} alt="User Icon" className="w-10 h-10" />
          <button onClick={handleSignOut} className="font-bold text-white">
            {" "}
            (Sign Out){" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
