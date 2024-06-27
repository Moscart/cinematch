"use client";

import React from "react";
import { useFollowPointer } from "../../app/(user)/use-follow-pointer";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const { xPoint, yPoint } = useFollowPointer(4);
  const { x, y } = useFollowPointer(16);
  return (
    <>
      <motion.div
        className="w-2 h-2 bg-white fixed top-0 left-0 rounded-full z-[90] pointer-events-none"
        style={{ x: xPoint, y: yPoint }}
      />
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-white fixed top-0 left-0 z-[90] pointer-events-none"
        style={{ x, y }}
      />
    </>
  );
}
