"use client";

import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import "moment/locale/id";
import { CardImage } from "@/components/main/card_image";
import { IMovie } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { stringLimiter } from "@/lib/utils";
import { translateToId } from "../../lib/serverUtils";

interface INowPlaying {
  data: IMovie[];
}

export const NowPlaying: React.FC<INowPlaying> = ({ data }) => {
  const [dataset, setDataset] = useState<IMovie[]>(data);
  const [api, setApi] = useState<CarouselApi>();
  const [npSelected, setNpSelected] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", (e) => {
      setNpSelected(e.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const overviews = dataset.map((movie) => movie.overview);
    translateToId(overviews).then((res) => {
      const dataTranslate = JSON.parse(res);
      const newData = dataset.map((movie, index) => {
        movie.overview = dataTranslate[index].text;
        return movie;
      });
      setDataset(newData);
    });
  }, [data]);

  return (
    <div className="p-24">
      <h1
        className="text-center mb-20"
        style={{
          textShadow: "0 0 15px #1d4ed8",
        }}
      >
        Now Playing
      </h1>
      <div className="grid grid-cols-2 max-w-screen-2xl mx-auto">
        <Carousel
          className=""
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
            ClassNames({
              snapped: "snapped",
              inView: "in-view",
            }),
          ]}
        >
          <CarouselContent className="-ml-4" withgradient="true">
            {dataset.map((movie) => (
              <CarouselItem
                key={movie.title}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <CardImage alt={movie.title} posterPath={movie.poster_path} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div
          className="bg-cover p-5"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--background)) 15%, hsl(var(--background) / .7), hsl(var(--background)) 85%), url('https://image.tmdb.org/t/p/original${data[npSelected].backdrop_path}')`,
          }}
        >
          <div className="z-10 flex flex-col gap-5">
            <div className="">
              <p className="font-bold text-2xl">
                {data[npSelected].original_title}
              </p>
              <p className="text-sm">{data[npSelected].title}</p>
            </div>
            <p className="font-semibold text-lg mt-3">Ringkasan</p>
            <p className="font-light text-sm">
              {stringLimiter({ text: data[npSelected].overview, length: 175 })}
            </p>
            <p className="font-semibold text-xs mt-3">
              {moment(data[npSelected].release_date).format("MMMM DD, YYYY")}
            </p>
            <Button
              className="mt-5 max-w-min bg-background/50"
              variant={"outline"}
            >
              Lihat Detail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
