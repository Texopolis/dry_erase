import React from "react";
import Header from "../components/Header";
import FriendsList from "../components/FriendsList";
import ChatWindow from "../components/ChatWindow";

type Props = { children: React.ReactNode };

export default async function Layout({ children }: Props) {
  return (
    <div id="dashboard-wrapper" className="h-screen flex relative">
      <header className="absolute">
        <Header />
      </header>
      <div className="flex h-full">
        <aside className="basis-72 bg-accent hidden md:inline">
          <FriendsList friends={["sal", "george", "ed"]} />
        </aside>
        <main className="grow mt-20 flex content-center items-center">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
}
