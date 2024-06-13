"use client";
import { ParallaxText } from "@/components/main/parallax-text";
import React from "react";

export default function Parallax() {
  return (
    <div className="mt-12">
      <ParallaxText baseVelocity={5}>
        CINE<div className="inline-block text-primary me-2">MATCH</div>
      </ParallaxText>
      <ParallaxText baseVelocity={-5}>
        CINE<div className="inline-block text-primary me-2">MATCH</div>
      </ParallaxText>
    </div>
  );
}
