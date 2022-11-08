import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware() {

  console.log("hellow from middleware")
  // let verify = req.cookies.get("loggedIn")?.value;
  // let {pathname} = req.nextUrl;

  // if (verify!=="true" && pathname === ("/dashboard")) {
  //   return NextResponse.redirect("/");
  // }
  // if (verify && url === "/") {
  //   return NextResponse.redirect("/dashboard");
  // }

  // if (!req.cookies.get("loggedIn") && req.url.includes("/dashboard")) {
  // NextResponse.redirect("/")
}
