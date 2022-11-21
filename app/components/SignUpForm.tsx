"use client";
import React, { useState, SetStateAction } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { Permanent_Marker } from "@next/font/google";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";


const permanent = Permanent_Marker({ weight: "400" });

const SignUpForm = () => {
  const router = useRouter();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [colorClass, setColorClass] = useState("");

  const handleName = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value);
  };

  const handleEmail = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPasswordCheck(e.target.value);
  };

  const createUser = async () => {
    try {
      if (auth.currentUser === null) return;
      const uid = auth.currentUser.uid;
      await setDoc(doc(db, "users", uid), {
        user: auth.currentUser?.uid,
        color: colorClass,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordCheck === ""
    ) {
      setErrorMessage("Please enter all fields");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (password !== passwordCheck) {
      setErrorMessage("Passwords must match");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorMessage("Invalid email");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setErrorMessage(
        "Password must be a minimum of eight characters, at least one letter and one number"
      );
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (colorClass === "") {
      setErrorMessage("Please choose a color");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        await updateProfile(user, { displayName: name });
        await createUser();
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
        let errMessage = "Unknonw error";
        if (error instanceof Error) errMessage = error.message;
        setErrorMessage(errMessage.slice("Firebase: ".length));
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
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

  const inputClass = `px-3 py-2 mb-4 placeholder-grey ${colorClass} relative bg-light rounded-xl border-0 shadow outline-none w-full text-center font-bold text-3xl ${permanent.className} tracking-wide placeholder:text-sm placeholder:text-italic placeholder:font-sans focus:ring`;

  const labelClass =
    "block text-sm font-medium text-primary_accent self-start mb-1";

  return (
    <div className="flex flex-col justify-center items-center w-80">
      <div className="h-4 mb-4 sticky">{message()}</div>
      <form className="flex flex-col w-80">
        <label
          htmlFor="name"
          className={name === "" ? "invisible" : labelClass}
        >
          Display Name
        </label>
        <input
          id="name"
          placeholder="screen name"
          onChange={handleName}
          className={inputClass}
          value={name}
          type="text"
          required
        />

        <label className={email === "" ? "invisible" : labelClass}>Email</label>
        <input
          id="email"
          placeholder="email"
          onChange={handleEmail}
          className={inputClass}
          value={email}
          type="email"
        />

        <label className={password === "" ? "invisible" : labelClass}>
          Password
        </label>
        <input
          id="password"
          placeholder="password"
          onChange={handlePassword}
          className={inputClass}
          value={password}
          type="password"
        />

        <label className={passwordCheck === "" ? "invisible" : labelClass}>
          Verfiy Password
        </label>
        <input
          id="passwordCheck"
          placeholder="verify password"
          onChange={handlePasswordCheck}
          className={inputClass}
          value={passwordCheck}
          type="password"
        />
        <div className="flex flex-col items-center w-full">
          <h2 className="mt-4">Choose your marker color</h2>
          <div className="flex gap-3 w-full h-10 justify-evenly mt-4 mb-6">
            <div
              className={`rounded-full w-10 hover:cursor-pointer hover:scale-110 bg-red ${
                colorClass === "text-red" ? "border-4 border-primary" : ""
              }`}
              onClick={() => setColorClass("text-red")}
            />
            <div
              className={`rounded-full w-10 hover:cursor-pointer hover:scale-110 bg-blue ${
                colorClass === "text-blue" ? "border-4 border-primary" : ""
              }`}
              onClick={() => setColorClass("text-blue")}
            />
            <div
              className={`rounded-full w-10 hover:cursor-pointer hover:scale-110 bg-green ${
                colorClass === "text-green" ? "border-4 border-primary" : ""
              }`}
              onClick={() => setColorClass("text-green")}
            />
            <div
              className={`rounded-full w-10 hover:cursor-pointer hover:scale-110 bg-purple ${
                colorClass === "text-purple" ? "border-4 border-primary" : ""
              }`}
              onClick={() => setColorClass("text-purple")}
            />
            <div
              className={`rounded-full w-10 hover:cursor-pointer hover:scale-110 bg-yellow ${
                colorClass === "text-yellow" ? "border-4 border-primary" : ""
              }`}
              onClick={() => setColorClass("text-yellow")}
            />
            <div
              className={`rounded-full w-10 hover:cursor-pointer hover:scale-110 bg-orange ${
                colorClass === "text-orange" ? "border-4 border-primary" : ""
              }`}
              onClick={() => setColorClass("text-orange")}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none rounded-lg  focus:ring-1 ring-inset bg-primary text-slate-800  hover:text-light hover:bg-primary_accent hover:scale-105 w-40 self-center"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
