"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCreds } from "@/lib/serverUtils";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function FormLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const router = useRouter();

  const handleSignIn = (data: FormData) => {
    setIsLoading(true);

    setTimeout(() => {
      const response = signInWithCreds(
        data.get("email") as string,
        data.get("password") as string
      );
      response
        .then((data) => {
          if (data?.errorMessage) {
            toast.error("Error", {
              description: data.errorMessage,
            });
          } else {
            toast.success("You are now signed in!");
            if (callbackUrl) {
              router.push(callbackUrl);
            } else {
              router.push("/admin");
            }
          }
        })
        .finally(() => setIsLoading(false));
      setIsLoading(false);
    }, 400);
  };
  return (
    <Card className="w-full max-w-sm z-10 border-none shadow-2xl shadow-black">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <form action={handleSignIn}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              required
              autoComplete="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your Password"
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isLoading}
            className="w-full font-bold text-background"
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={3} />
            )}
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
