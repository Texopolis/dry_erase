"use client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "../firebase/firebase";
import UserChatBubble from "../components/UserChatBubble";
import FriendChatBubble from "./FriendChatBubble";
import uuid from "react-uuid";

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
      setConversation(message.sort((a, b) => b.timestamp - a.timestamp));
    });
    return () => {
      unsub;
    };
  }, []);

  const refArr = useRef(new Array());

  useEffect(() => {
    refArr.current[0] &&
      refArr.current[0].scrollIntoView({ behavior: "smooth" });
  }, [conversation, refArr]);

  const createMessage = async (userId: string, message: string) => {
    try {
      const messageRef = await addDoc(collection(db, "messages"), {
        sender: userId,
        message: message,
        timestamp: Date.now(),
        messageId: uuid(),
        displayName: auth.currentUser?.displayName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="chat-window-wrapper"
      className="h-full w-full flex justify-center items-center py-6"
    >
      <div
        id="chat-window"
        className="bg-light h-full w-10/12 mb-1 rounded-lg backdrop-blur-sm drop-shadow-2xl shadow-dark z-10  flex flex-col relative"
      >
        <div className="overflow-auto flex-grow px-4 pb-1 flex flex-col-reverse">
          {conversation?.map((item: Message) => {
            if (item.sender === auth.currentUser?.uid) {
              return (
                <UserChatBubble
                  senderId={item.sender}
                  message={item.message}
                  timestamp={item.timestamp}
                  key={item.messageId}
                  displayName={item.displayName}
                  ref={(ref) => refArr.current.push(ref)}
                />
              );
            } else
              return (
                <FriendChatBubble
                  senderId={item.sender}
                  message={item.message}
                  timestamp={item.timestamp}
                  key={item.messageId}
                  displayName={item.displayName}
                  ref={(ref) => refArr.current.push(ref)}
                />
              );
          })}
        </div>
        <div className="w-auto flex justify-center items-center p-4">
          <form
            onSubmit={handleSubmit}
            className=" flex items-center justify-center w-11/12 border-primary_accent border-2 rounded-xl"
          >
            <input
              className=" p-4 flex-grow rounded-xl bg-transparent text-center text-lg caret-accent"
              placeholder="say something nice"
              onChange={handleChange}
              value={currentMessage}
            ></input>
            <button type="submit" className="p-4 bg-transparent hidden">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
