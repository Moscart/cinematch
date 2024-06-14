"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

function SmoothScrolling({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
