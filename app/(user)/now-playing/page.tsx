"use client";

import { CardMovie } from "@/components/main/card_movie";
import { Button } from "@/components/ui/button";
import { IMovie, IMovieList } from "@/lib/type";
import { api } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

export default function NowPlayingPage() {
  const [data, setData] = useState<IMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const { results: movies, total_pages }: IMovieList = await api.fetch(
      `/api/now-playing/1`,
      {
        withoutAuth: true,
      }
    );
    setData(movies);
    setTotalPages(total_pages);
  };
  const handleLoadMore = async () => {
    if (page < totalPages) {
      setIsLoading(true);
      const { results: movies }: IMovieList = await api.fetch(
        `/api/now-playing/${page + 1}`,
        { withoutAuth: true }
      );
      setIsLoading(false);
      setData((prevData) => [...prevData, ...movies]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="p-24">
      <h1
        className="text-center mb-20"
        style={{
          textShadow: "0 0 15px hsl(var(--primary))",
        }}
      >
        Now Playing
      </h1>
      <div className="w-3/4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-5 gap-x-5 gap-y-7">
          {data.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.15 * (index % 20),
                duration: 1,
              }}
            >
              <Link href={`/detail/${movie.id}`} target="_blank">
                <CardMovie
                  title={movie.title}
                  posterPath={movie.poster_path}
                  vote={movie.vote_average}
                  releaseDate={movie.release_date}
                />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center pt-20">
          {page !== totalPages && (
            <Button
              className="border-2 border-white bg-background hover:bg-background text-white"
              onClick={handleLoadMore}
            >
              {isLoading && (
                <Loader className="size-4 me-2 animate-spin" strokeWidth={3} />
              )}
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
