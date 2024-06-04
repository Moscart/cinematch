import React, { Suspense } from "react";
import FormLogin from "./form";

export default function LoginForm() {
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
      <Suspense>
        <FormLogin />
      </Suspense>
    </main>
  );
}
