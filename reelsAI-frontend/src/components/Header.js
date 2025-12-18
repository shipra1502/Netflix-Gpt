import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toogleGptSearchView, clearGptMovieResults } from "../utils/gptSlice";
import lang from "../utils/languageConstants";
import { setLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const langFlag = useSelector((store) => store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // navigate("/error");
      });
  };
  const handleGptSearchClick = () => {
    dispatch(clearGptMovieResults());
    dispatch(toogleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute px-0 md:px-8 py-2 w-screen bg-gradient-to-b from-black flex flex-col md:flex-row md:justify-between items-center  z-20">
      <div className="flex items-center mx-auto md:mx-0">
        <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-red-500 bg-clip-text text-transparent tracking-wider">
          REELS
        </span>
        <span className="ml-1 text-sm md:text-base font-bold text-red-400">
          AI
        </span>
      </div>
      {user && (
        <div className="flex justify-between p-2">
          {langFlag && (
            <select
              className="bg-black text-white rounded-md py-2 px-4 mx-2 md:mx-4 my-2 text-sm md:text-base"
              onChange={handleLanguageChange}
            >
              {Object.entries(lang).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.label}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 text-white rounded-lg bg-purple-600 bg-opacity-50 hover:bg-opacity-30 transition text-sm md:text-base"
            onClick={handleGptSearchClick}
          >
            {langFlag ? " HomePage" : "GPT Search"}
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 ml-4 my-2 text-sm md:text-base
             text-gray-200
             bg-white/5
             border border-white/20
             rounded-md
             hover:bg-white/10
             hover:border-white/30
             transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
