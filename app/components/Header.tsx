"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { User as FirebaseUser } from "firebase/auth";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser !== null) {
        setCurrentUser(firebaseUser);
        setIsLoggedIn(true);
        console.log("user from useEffect: ", firebaseUser);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
        console.log("user logged out from useEffect");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return isLoggedIn ? (
    <div id="header-wrapper">
      <div id="header" className="w-screen flex h-20 justify-end">
        <button
          className="py-2.5 px-5 mr-4 text-sm font-medium focus:outline-none rounded-lg  focus:z-10 focus:ring-1 focus:ring-accent ring-inset bg-primary text-slate-800  hover:text-light hover:bg-primary_accent hover:scale-105 w-40 self-center"
          onClick={handleLogout}
        >
          logout {currentUser?.displayName} &nbsp;
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Header;
