"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
// import { ref, push, set, onValue, onChildAdded } from "firebase/database";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "../firebase/firebase";

const ChatWindow = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [conversation, setConversation] = useState<Message>();

  type Message = {
    [x: string]: any;
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setCurrentMessage(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (auth.currentUser) {
      try {
        const uid = auth.currentUser.uid;
        createMessage(uid, currentMessage);
        setCurrentMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (querySnapshot) => {
      const message = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
        // console.log("message", message)
        // console.log("message sorted", message.sort((a,b)=>a.timestamp-b.timestamp))

      setConversation(message.sort((a,b)=>b.timestamp-a.timestamp));
    });
    return () => {
      unsub;
    };
  }, []);

  console.log("first,", conversation);

  const createMessage = async (userId: string, message: string) => {
    try {
      const messageRef = await addDoc(collection(db, "messages"), {
        sender: userId,
        message: currentMessage,
        timestamp: Date.now(),
      });
      console.log("Document written with ID: ", messageRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="chat-window-wrapper"
      className="h-full w-full flex justify-center items-end"
    >
      <div
        id="chat-window"
        className="bg-primary_accent h-4/5 w-4/5 mb-4 rounded-lg backdrop-blur-sm drop-shadow-lg z-10 border-dark flex flex-col-reverse"
      >
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            className="rounded-xl m-4 p-4 w-full"
            placeholder="say something nice"
            onChange={handleChange}
            value={currentMessage}
          ></input>
          <button type="submit">submit</button>
        </form>
        <div>figure this out</div>
        {conversation?.map((item:Message, id:string) => {
          return <span key={id}>{item.message}</span>;
        })}
      </div>
    </div>
  );
};

export default ChatWindow;
