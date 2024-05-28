"use client";

import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { handleSignOut } from "@/lib/serverUtils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const LogoutButton = () => {
  return (
    // <button onClick={handleSignOut}>Sign Out</button>
    <Button
      // disabled={isLoading}
      className="w-full font-bold text-background"
      onClick={() => handleSignOut()}
    >
      {/* {isLoading && (
        <Loader2
          className="mr-2 h-4 w-4 animate-spin"
          strokeWidth={3}
        />
      )} */}
      Sign out
    </Button>
  );
};

export default function Logout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <main className="min-h-screen grid place-items-center">
      <Card className="w-full max-w-sm">
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
