import React from "react";
import Header from "../components/Header";
import FriendsList from "../components/FriendsList";

type Props = { children: React.ReactNode };

export default async function Layout({ children }: Props) {
  return (
    <div id="dashboard-wrapper" className="h-screen">
      <header className="h-20">
        <Header />
      </header>
      <div className="flex h-full">
        <aside className="basis-72 bg-accent">
          <FriendsList friends={["sal", "george", "ed"]} />
        </aside>
        <main className="bg-dark grow">{children}</main>
      </div>
    </div>
  );
}
