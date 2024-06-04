"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import FrozenRoute from "./frozen-route";

export default function PageAnimate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const jumlahBox = 4; // Ganti dengan jumlah box yang diinginkan

  const boxes = Array.from({ length: jumlahBox }, (_, index) => ({
    content: `Box ${index + 1}`,
  }));

  const left = ["left-0", "left-1/4", "left-2/4", "left-3/4"];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname}>
        <FrozenRoute>{children}</FrozenRoute>
        {boxes.map((box, index) => (
          <motion.div
            key={box.content}
            className={`fixed w-1/4 top-0 ${left[index]} h-screen bg-primary origin-top z-50`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{
              ease: [0.22, 1, 0.36, 1],
              duration: 0.4,
              delay: index * 0.1,
            }}
          ></motion.div>
        ))}
        {boxes.map((box, index) => (
          <motion.div
            key={box.content}
            className={`fixed w-1/4 top-0 left-${
              index == 0 ? index : index + "/4"
            } h-screen bg-primary origin-bottom z-50`}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{
              ease: [0.22, 1, 0.36, 1],
              duration: 0.4,
              delay: index * 0.1,
            }}
          ></motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
