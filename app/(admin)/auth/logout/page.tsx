"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { handleSignOut } from "@/lib/serverUtils";
import { ArrowLeft, LogOut } from "lucide-react";
import { animatePageOut } from "../../animation";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  return (
    <Button
      className="w-full font-bold text-background"
      onClick={() => handleSignOut()}
    >
      <LogOut className="size-4 me-2" strokeWidth={3} />
      Logout
    </Button>
  );
};

export default function Logout() {
  const router = useRouter();
  const jumlahBox = 1000;

  const boxes = Array.from({ length: jumlahBox }, (_, index) => ({
    content: `Box ${index + 1}`,
  }));
  return (
    <main className="relative min-h-screen grid place-items-center overflow-hidden">
      <div className="absolute flex flex-wrap gap-[.4vw] h-screen justify-center z-0 w-[105vw]">
        {boxes.map((box) => (
          <div
            className="w-[4.1vw] h-[4.1vw] bg-stone-900 rounded-[.45vw] hover:bg-primary hover:transition-colors hover:duration-0 duration-custom transition-colors ease-out"
            key={box.content}
          ></div>
        ))}
      </div>
      <div className="absolute top-0 bg-gradient-to-b from-transparent via-primary to-transparent w-full h-full -z-20 test"></div>
      <Card className="w-full max-w-sm z-10 border-none rounded-3xl shadow-none drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] relative bg-transparent">
        <Button
          className="rounded-full h-12 w-12 absolute font-bold text-background hover:bg-primary hover:scale-[115%] transition-transform ease-in-out duration-500"
          onClick={() => animatePageOut("/admin", router)}
        >
          <ArrowLeft className="h-8 w-8" strokeWidth={3} />
        </Button>
        <div
          className="-z-10 w-full bg-background absolute bottom-0 rounded-3xl"
          style={{
            height: "calc(100% - 58px)",
          }}
        ></div>
        <div
          className="-z-10 h-full bg-background absolute right-0 rounded-3xl"
          style={{
            width: "calc(100% - 58px)",
          }}
        ></div>
        <div
          className="-z-10 w-[36px] h-[36px] absolute top-[24px] left-[24px]"
          style={{
            background:
              "radial-gradient(circle at top left, transparent 34px, hsl(var(--background)) 0)",
          }}
        ></div>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Logout</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          Are you sure you want to logout?
        </CardContent>
        <CardFooter>
          <LogoutButton />
        </CardFooter>
      </Card>
    </main>
  );
}
