import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

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
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
