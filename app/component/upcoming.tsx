"use client";

import React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CardImage } from "@/components/main/card_image";
import { IMovie } from "@/lib/type";

interface IUpcoming {
  data: IMovie[];
}

export const Upcoming: React.FC<IUpcoming> = ({ data }) => {
  return (
    <div className="p-24 py-48 relative">
      <div className="absolute w-full top-0 right-0 left-0 z-[-1]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="rotate-180"
        >
          <defs>
            <linearGradient id="wave" x1="0%" x2="0%" y1="100%" y2="60%">
              <stop offset="0%" stopColor="hsl(var(--primary) / .8)" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave)"
            fillOpacity="1"
            d="M0,224L15,224C30,224,60,224,90,202.7C120,181,150,139,180,138.7C210,139,240,181,270,208C300,235,330,245,360,218.7C390,192,420,128,450,122.7C480,117,510,171,540,165.3C570,160,600,96,630,69.3C660,43,690,53,720,96C750,139,780,213,810,213.3C840,213,870,139,900,106.7C930,75,960,85,990,122.7C1020,160,1050,224,1080,245.3C1110,267,1140,245,1170,240C1200,235,1230,245,1260,245.3C1290,245,1320,235,1350,234.7C1380,235,1410,245,1425,250.7L1440,256L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"
          ></path>
        </svg>
      </div>
      <h1
        className="text-center mb-20"
        style={{
          textShadow: "0 0 15px #000",
        }}
      >
        Upcoming
      </h1>
      <Carousel
        className="z-[-0] max-w-screen-2xl mx-auto"
        opts={{
          align: "center",
          loop: true,
          watchDrag: false,
        }}
        plugins={[
          AutoScroll({
            startDelay: 0,
            speed: 1,
            stopOnInteraction: false,
          }),
        ]}
        style={{
          maskImage:
            "linear-gradient(to left, transparent, rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), transparent)",
        }}
      >
        <CarouselContent className="-ml-4">
          {data.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="pl-4 md:basis-1/2 lg:basis-1/5 opacity-100"
            >
              <CardImage alt={movie.title} posterPath={movie.poster_path} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
