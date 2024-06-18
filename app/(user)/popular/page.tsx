"use client";

import { CardMovie } from "@/components/main/card_movie";
import { Button } from "@/components/ui/button";
import { IMovie, IMovieList } from "@/lib/type";
import { api } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PopularPage() {
  const [data, setData] = useState<IMovie[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const { results: movies }: IMovieList = await api.fetch(`/api/popular/1`, {
      withoutAuth: true,
    });
    setData(movies);
  };
  const handleLoadMore = async () => {
    const { results: movies }: IMovieList = await api.fetch(
      `/api/popular/${page + 1}`,
      { withoutAuth: true }
    );

    setData((prevData) => [...prevData, ...movies]);
    setPage((prevPage) => prevPage + 1);
  };

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
            className="bg-background hover:bg-primary transition-colors duration-500"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
