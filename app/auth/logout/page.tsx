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

const LogoutButton = () => {
  return (
    <Button
      className="w-full font-bold text-background"
      onClick={() => handleSignOut()}
    >
      Sign out
    </Button>
  );
};

export default function Logout() {
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
      <Card className="w-full max-w-sm z-10 border-none shadow-2xl shadow-black">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Signout</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          Are you sure you want to sign out?
        </CardContent>
        <CardFooter>
          <LogoutButton />
        </CardFooter>
      </Card>
    </main>
  );
}
