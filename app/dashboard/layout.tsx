import React from "react";
import Header from "../components/Header";
import FriendsList from "../components/FriendsList";
import ChatWindow from "../components/ChatWindow";

type Props = { children: React.ReactNode };

export default async function Layout({ children }: Props) {
  return (
    <div id="dashboard-wrapper" className="h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <div className="flex h-full">
        <aside className="basis-72 bg-accent">
          <FriendsList friends={["sal", "george", "ed"]} />
        </aside>
        <main className="grow">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
}
