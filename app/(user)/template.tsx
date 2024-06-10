"use client";

import React, { useEffect } from "react";
import { animatePageIn } from "./animation";
import Navbar from "./navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <div>
      <div
        id="banner-1"
        className="min-h-screen bg-primary z-40 fixed left-0 top-0 w-1/4"
      ></div>
      <div
        id="banner-2"
        className="min-h-screen bg-primary z-40 fixed left-1/4 top-0 w-1/4"
      ></div>
      <div
        id="banner-3"
        className="min-h-screen bg-primary z-40 fixed left-2/4 top-0 w-1/4"
      ></div>
      <div
        id="banner-4"
        className="min-h-screen bg-primary z-40 fixed left-3/4 top-0 w-1/4"
      ></div>
      {/* <div
        id="white-banner"
        className="w-screen h-[200vh] top-[100vh] rounded-t-full bg-white mix-blend-difference z-50 fixed"
      ></div>

      <div
        id="black-banner"
        className="w-screen h-[200vh] bottom-[100vh] rounded-b-full bg-black z-50 fixed"
      ></div> */}
      <nav className="fixed z-50 grid grid-cols-5 border-t-8 border-primary w-full">
        <div className="col-span-1 bg-primary rounded-br-3xl flex justify-center items-center font-extrabold text-4xl tracking-wide">
          CINE<span className="text-background">MATCH</span>
        </div>
        <div className="col-span-4 p-3 relative">
          <div className="h-12 w-6 bg-transparent absolute top-0 left-0 rounded-tl-3xl shadow-[0_-25px_0_0_hsl(var(--primary))]"></div>
          <Navbar />
        </div>
      </nav>
      {children}
    </div>
  );
}
