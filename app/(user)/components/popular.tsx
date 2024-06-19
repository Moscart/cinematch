"use client";

import { CardMovie } from "@/components/main/card_movie";
import { Button } from "@/components/ui/button";
import { IMovie } from "@/lib/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { animatePageOut } from "../animation";
import { ChevronRightCircle } from "lucide-react";

interface IPopular {
  data: IMovie[];
}

export const Popular: React.FC<IPopular> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="p-24 bg-gradient-to-t from-primary/80 to-transparent">
      <h1
        className="text-center mb-20"
        style={{
          textShadow: "0 0 15px hsl(var(--primary))",
        }}
      >
        Popular
      </h1>
      <div className="w-3/4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-5 gap-x-5 gap-y-7">
          {data.map((movie) => (
            <Link href={`/detail/${movie.id}`} target="_blank" key={movie.id}>
              <CardMovie
                title={movie.title}
                posterPath={movie.poster_path}
                vote={movie.vote_average}
                releaseDate={movie.release_date}
              />
            </Link>
          ))}
        </div>
        <div className="text-center pt-20">
          <Button
            className="bg-background hover:bg-primary transition-colors duration-500 font-bold rounded-full"
            onClick={() => animatePageOut("/popular", router)}
          >
            See More
            <ChevronRightCircle className="size-4 ms-2" strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
};
