"use client";

import Image from "next/image";
import React from "react";

export default function Background() {
  return (
    <div className="px-24 py-24 grid grid-cols-12 grid-rows-4 gap-5 relative">
      <div className="col-span-4 row-span-4 col-start-1 row-start-1 grid grid-cols-4 grid-rows-4 gap-5 relative">
        <div className="aspect-square col-start-1 row-start-1 bg-primary rounded-3xl"></div>
        <div className="col-span-1 row-span-1 col-start-2 row-start-2 relative">
          <div className="w-12 h-24 bg-transparent absolute top-0 left-0 -translate-x-full -translate-y-full rounded-br-[48px] shadow-[0_48px_0_0_#00A3E6]"></div>
        </div>
        <div className="col-span-3 row-span-2 col-start-2 row-start-1 bg-[#00A3E6] rounded-3xl"></div>
        <div className="col-span-2 row-span-1 col-start-1 row-start-2 bg-[#00A3E6] rounded-3xl"></div>
        <div className="col-span-2 row-span-4 col-start-3 row-start-1 bg-[#00A3E6] rounded-3xl"></div>
        <div className="col-span-2 row-span-2 col-start-1 row-start-3 bg-primary rounded-3xl -z-10"></div>
        <div className="col-span-1 row-span-1 col-start-3 row-start-2 relative">
          <div className="w-12 h-24 bg-transparent absolute bottom-0 left-0 -translate-x-full translate-y-full rounded-tr-[48px] shadow-[0_-48px_0_0_#00A3E6]"></div>
        </div>
        <Image
          alt="Godzilla x Kong: The New Empire"
          src={"/gxk.png"}
          fill
          className="object-cover object-right-top rounded-3xl"
          style={{
            filter:
              "hue-rotate(325deg) brightness(195%) sepia(0.14) saturate(110%)",
          }}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div className="col-span-4 row-span-3 col-start-5 row-start-2 bg-primary rounded-3xl overflow-hidden">
        <div className="w-full h-full relative">
          <div
            className="w-max absolute text-background font-[1000] right-0 p-[1vw] text-[4.5cqw] leading-[0.8]"
            style={{
              writingMode: "vertical-rl",
            }}
          >
            <p>FURIOSA</p>
            <p>FURIOSA</p>
            <p>FURIOSA</p>
          </div>
        </div>
      </div>
      <div className="col-span-7 row-span-2 col-start-5 row-start-1 bg-transparent rounded-3xl grid grid-cols-7 grid-rows-2 gap-5">
        <div className="col-span-6 col-start-1 row-start-1 bg-[#00A3E6] rounded-3xl"></div>
        <div className="col-span-3 row-span-2 col-start-5 row-start-1 bg-[#00A3E6] rounded-3xl relative"></div>
        <div className="col-span-1 row-span-1 col-start-5 row-start-1 relative">
          <div className="w-12 h-24 bg-transparent absolute bottom-0 left-0 -translate-x-full translate-y-full rounded-tr-[48px] shadow-[0_-48px_0_0_rgb(0,163,230)]"></div>
        </div>
      </div>
      <div className="col-span-1 row-span-2 col-start-12 row-start-1 bg-primary rounded-3xl"></div>
      <div className="col-span-4 row-span-2 col-start-9 row-start-3 grid grid-cols-4 grid-rows-2 gap-5 relative">
        <div className="col-span-3 row-span-1 col-start-2 row-start-1 bg-[#00A3E6] rounded-3xl"></div>
        <div className="col-span-3 row-span-1 col-start-1 row-start-2 bg-[#00A3E6] rounded-3xl"></div>
        <div className="col-span-2 row-span-2 col-start-2 row-start-1 bg-[#00A3E6] rounded-3xl"></div>
        <div className="col-span-1 row-span-1 col-start-2 row-start-2 relative">
          <div className="w-12 h-24 bg-transparent absolute top-0 left-0 -translate-x-full -translate-y-full rounded-br-[48px] shadow-[0_48px_0_0_#00A3E6]"></div>
        </div>
        <div className="col-span-1 row-span-1 col-start-3 row-start-1 relative">
          <div className="w-12 h-24 bg-transparent absolute bottom-0 right-0 translate-x-full translate-y-full rounded-tl-[48px] shadow-[0_-48px_0_0_#00A3E6]"></div>
        </div>
        <div className="col-span-1 row-span-1 col-start-1 row-start-1 bg-primary rounded-3xl z-10"></div>
        <div className="col-span-1 row-span-1 col-start-4 row-start-2 bg-primary rounded-3xl z-10"></div>
      </div>
      <div className="col-span-3 row-span-4 col-start-9 row-start-1 relative">
        <Image
          alt="Alien: Romulus"
          src={"/alien-romulus.png"}
          fill
          className="object-cover rounded-3xl z-10 rotate-180 -scale-x-100 object-right-bottom"
          style={{
            filter:
              "hue-rotate(35deg) brightness(150%) sepia(0.14) saturate(110%)",
          }}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <Image
        className="h-[110%] w-max absolute bottom-0 left-1/2 -translate-x-1/2 p-[inherit]"
        alt="Furiosa"
        src={"/furiosa-person.png"}
        height={1500}
        width={1500}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  );
}
