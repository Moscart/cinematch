"use client";

import React, { useState } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useFormState } from "react-dom";
import { authenticate } from "@/lib/serverUtils";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDispatch = (data: FormData) => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(data);
      setIsLoading(false);
    }, 400);
  };

  const jumlahBox = 1000; // Ganti dengan jumlah box yang diinginkan

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
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <form action={handleDispatch}>
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
            {errorMessage && (
              <Alert variant={"destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button
              disabled={isLoading}
              className="w-full font-bold text-background"
            >
              {isLoading && (
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  strokeWidth={3}
                />
              )}
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
