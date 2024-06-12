"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "./animation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 bg-background/50 backdrop-blur p-3 rounded-2xl">
      <NavbarLink href="/" path={pathname} placeholder="Home" />
      <NavbarLink
        href="/now-playing"
        path={pathname}
        placeholder="Now Playing"
      />
      <NavbarLink href="/populer" path={pathname} placeholder="Populer" />
      <NavbarLink href="/upcoming" path={pathname} placeholder="Upcoming" />
    </div>
  );
}

function NavbarLink({
  href,
  path,
  placeholder,
}: Readonly<{
  href: string;
  path: string;
  placeholder: React.ReactNode;
}>) {
  const router = useRouter();

  const spring = {
    type: "spring",
    stiffness: 150,
    damping: 20,
  };

  return (
    <div className="inline-block relative">
      <Button
        className={`bg-transparent shadow-none ${
          path !== href ? "hover:bg-secondary/50" : "hover:bg-none"
        }`}
        onClick={() => path !== href && animatePageOut(href, router)}
      >
        {placeholder}
      </Button>
      {path === href && (
        <motion.div
          className="w-full h-full absolute bg-primary -z-10 rounded-md top-0"
          layout
          layoutId="underline"
          transition={spring}
          style={{ originY: "0px" }}
        />
      )}
    </div>
  );
}
