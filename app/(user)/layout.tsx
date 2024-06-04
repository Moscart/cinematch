import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import PageAnimate from "./page-animate";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinematch",
  description: "Unlock Your Perfect Movie Match with Cinematch!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <PageAnimate>{children}</PageAnimate>
      </body>
    </html>
  );
}
