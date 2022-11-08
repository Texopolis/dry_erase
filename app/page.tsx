"use client";
import React, { useState } from "react";
import { Permanent_Marker } from "@next/font/google";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { useRouter } from "next/navigation";
import { auth } from "./firebase/firebase";

const permanent = Permanent_Marker({ weight: "400" });

function Page() {
  const [placeHolder, setPlaceholder] = useState("title");

  const title = (
    <h1
      className={`text-8xl text-dark font-extrabold my-2 ${permanent.className}`}
    >
      Dry Erase
    </h1>
  );

  const loginForm = <div>login</div>;

  return (
    <div id="landing-wrapper" className="w-full h-full">
      <div className="flex justify-center items-center gap-4 ">
        <div>{placeHolder === "title" && title}</div>
        <div>{placeHolder === "signUp" && <SignUpForm />}</div>
        <div>{placeHolder === "loginForm" && <LoginForm />}</div>
        {placeHolder === "title" && (
          <div className="flex justify-between items-center flex-col h-20">
            <h4
              className="text-xl  text-dark hover:scale-125 cursor-pointer"
              onMouseDown={() => setPlaceholder("loginForm")}
            >
              login
            </h4>
            <h4
              className="text-xl  text-dark hover:scale-125 cursor-pointer"
              onMouseDown={() => setPlaceholder("signUp")}
            >
              sign up
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
