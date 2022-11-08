"use client";
import React, { SetStateAction, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleEmail = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
  };

  // Show error message if error is true
  const message = () => {
    return (
      <div
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1 className="text-accent font-semibold">{errorMessage}</h1>
      </div>
    );
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      let errMessage = "Unknown error";
      if (error instanceof Error) errMessage = error.message;
      setErrorMessage(errMessage.slice("Firebase: ".length));
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const inputClass =
    "px-3 py-2 mb-4 placeholder-dark text-dark relative bg-light rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full text-center";

  const labelClass = "block text-sm font-medium text-dark self-start";

  return (
    <div className="flex flex-col justify-center items-center w-80">
      <div className="h-4 sticky">{message()}</div>

      <form className="flex flex-col w-80">
        <label
          htmlFor="email"
          className={email === "" ? "invisible" : labelClass}
        >
          Email
        </label>
        <input
          className={inputClass}
          id="email"
          placeholder="Email"
          onChange={handleEmail}
          value={email}
          type="text"
        />
        <label
          htmlFor="email"
          className={password === "" ? "invisible" : labelClass}
        >
          Password
        </label>
        <input
          className={inputClass}
          id="password"
          placeholder="Password"
          onChange={handlePassword}
          value={password}
          type="password"
        />
        <button
          onClick={handleSubmit}
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none rounded-lg  focus:z-10 focus:ring-1 focus:ring-accent ring-inset bg-primary text-slate-800  hover:text-light hover:bg-primary_accent hover:scale-105 w-40 self-center"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
