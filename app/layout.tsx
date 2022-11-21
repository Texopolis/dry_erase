import "./globals.css";
import { Lato } from "@next/font/google";
import React from "react";

const lato = Lato({ weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.className}>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="flex flex-col justify-center h-screen relative ">
        <main>{children}</main>
      </body>
    </html>
  );
}
