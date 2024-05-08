"use client";

import { CardImage } from "@/components/main/card_image";
import { Button } from "@/components/ui/button";
import { recommendation } from "@/lib/serverUtils";
import { Movie } from "@prisma/client";
import moment from "moment";
import "moment/locale/id";
import { useEffect, useState } from "react";

export default function Sample({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const keywords = `${searchParams.keywords}`;
  const [data, setData] = useState<Movie[] | []>([]);

  useEffect(() => {
    recommendation(keywords).then((res) => {
      setData(JSON.parse(res));
    });
  }, []);

  return (
    <main className="min-h-screen">
      <div className="p-24">
        <div className="w-3/4 mx-auto max-w-screen-2xl">
          <div className="grid grid-rows-1 gap-5">
            {data.map((movie, index) => (
              <div className="flex gap-5 flex-row" key={movie.id}>
                <div className="basis-[15%]">
                  <CardImage
                    posterPath={movie.poster_path}
                    alt="Godzilla Minus One"
                  />
                </div>
                <div className="basis-[85%] rounded-xl border bg-card p-5">
                  <div className="flex">
                    <div className="rounded-xl bg-primary text-background flex justify-center items-center w-14 me-3 font-extrabold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-2xl">
                        {movie.original_title}
                      </p>
                      <p className="text-sm">{movie.title}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-lg mt-3">Ringkasan</p>
                  <p className="font-light text-sm">{movie.overview}</p>
                  <p className="font-semibold text-xs mt-3">
                    {moment(movie.release_date).format("MMMM DD, YYYY")}
                  </p>
                  <Button
                    className="mt-5 max-w-min bg-background/50"
                    variant={"outline"}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
