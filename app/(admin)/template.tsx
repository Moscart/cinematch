"use client";

import React, { useEffect } from "react";
import { animatePageIn } from "./animation";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <div>
      <div
        id="banner-1"
        className="min-h-screen bg-primary z-50 fixed left-0 top-0 w-1/4"
      ></div>
      <div
        id="banner-2"
        className="min-h-screen bg-primary z-50 fixed left-1/4 top-0 w-1/4"
      ></div>
      <div
        id="banner-3"
        className="min-h-screen bg-primary z-50 fixed left-2/4 top-0 w-1/4"
      ></div>
      <div
        id="banner-4"
        className="min-h-screen bg-primary z-50 fixed left-3/4 top-0 w-1/4"
      ></div>
      {children}
    </div>
  );
}
