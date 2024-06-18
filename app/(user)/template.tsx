"use client";

import React, { useEffect } from "react";
import { animatePageIn } from "./animation";
import Navbar from "./navbar";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    window.scrollTo(0, 0);
    animatePageIn();
  }, []);
  return (
    <div>
      <div
        id="hidden-background"
        className="h-screen w-screen bg-background fixed top-0 left-0 z-40"
      >
        <div
          id="banner-1"
          className="absolute bottom-1/2 right-0 translate-x-1/2"
        >
          <div className="inline-block font-extrabold text-8xl text-nowrap leading-normal">
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
          </div>
        </div>
        <div id="banner-2" className="absolute top-1/2 -translate-x-1/2">
          <div className="inline-block font-extrabold text-8xl text-nowrap leading-3">
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
            CINE<div className="inline-block text-primary me-2">MATCH</div>
          </div>
        </div>
      </div>
      <nav className="sticky top-0 z-50 flex border-t-8 border-primary w-full">
        <div className="px-12 bg-primary rounded-br-3xl flex justify-center items-center font-[1000] text-4xl">
          CINE<span className="text-background">MATCH</span>
        </div>
        <div className="p-3 relative flex-grow">
          <div className="h-12 w-6 bg-transparent absolute top-0 left-0 rounded-tl-3xl shadow-[0_-25px_0_0_hsl(var(--primary))]"></div>
          <Navbar />
        </div>
      </nav>
      {children}
    </div>
  );
}
