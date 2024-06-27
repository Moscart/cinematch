"use client";

import { CardImage } from "@/components/main/card_image";
import Score from "@/components/main/score";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GENRE_MOVIE } from "@/lib/constant";
import { translateToId } from "@/lib/serverUtils";
import { Cast, CrewDouble, Genre, MovieDetail } from "@/lib/type";
import { api, formatTime } from "@/lib/utils";
import { Play } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Detail({
  params,
}: Readonly<{ params: { id: string } }>) {
  const [data, setData] = useState<MovieDetail | null>(null);

  useEffect(() => {
    getDetailMovie();
  }, []);

  const getDetailMovie = async () => {
    const detail: MovieDetail = await api.fetch(
      `/api/movie/detail/${params.id}`
    );
    translateToId([detail.overview, detail.tagline]).then((res) => {
      const dataTranslate = JSON.parse(res);
      const newData = {
        ...detail,
        overview: dataTranslate[0].text,
        tagline: dataTranslate[1].text,
      };
      setData(newData);
    });
  };

  const getProfile = (crew: Cast[]) => {
    const filteredData = crew.filter((person) => {
      return (
        person.job === "Director" ||
        person.job === "Story" ||
        person.job === "Screenplay" ||
        person.job === "Writer"
      );
    });

    const result: CrewDouble[] = [];

    filteredData.forEach((person) => {
      const existingPerson = result.find(
        (p) => p.original_name === person.original_name
      );

      if (existingPerson) {
        existingPerson.job?.push(person.job!);
      } else {
        result.push({
          ...person,
          original_name: person.original_name,
          job: [person.job ?? ""],
        });
      }
    });

    result.forEach((item) => {
      item.job = Array.from(new Set(item.job));
    });

    return result;
  };

  const formattedNumber = (number: number) => {
    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
    return format;
  };

  return (
    <main className="min-h-screen">
      {data && (
        <div className="max-w-screen-xl mx-auto">
          <div className="pt-24">
            <div className="flex gap-5">
              <div className="basis-[25%]">
                <CardImage
                  posterPath={data.poster_path}
                  alt={`${data.title}`}
                />
              </div>
              <Card className="basis-[75%] p-5 flex gap-5 flex-col">
                <div className="">
                  <div className="text-2xl">
                    <span className="font-bold me-2">
                      {data.original_title}
                    </span>
                    <span className="text-muted-foreground">
                      ({moment(data.release_date).format("YYYY")})
                    </span>
                  </div>
                  <p className="font-light text-sm">{data.title}</p>
                </div>
                <div className="font-light text-sm flex gap-2">
                  <p>{moment(data.release_date).format("DD/MM/Y")}</p>
                  <p>&#x22C5;</p>
                  {data.genres.length ? (
                    <p className="">
                      {data.genres
                        .map((genre: Genre) => {
                          return GENRE_MOVIE[genre.id];
                        })
                        .join(", ")}
                    </p>
                  ) : (
                    <p>Tidak Ada Genre</p>
                  )}
                  <p>&#x22C5;</p>
                  <div className="">{formatTime(data.runtime)}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <Score vote={data.vote_average} />
                  <div className="text-sm font-semibold">
                    <p>Skor</p>
                    <p>Pengguna</p>
                  </div>
                </div>
                {data.tagline !== "" && (
                  <p className="font-medium text-sm italic text-muted-foreground">
                    {data.tagline}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-lg">Ringkasan</p>
                  <p className="font-light text-sm">
                    {data.overview === ""
                      ? "Tidak ada ringkasan"
                      : data.overview}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  {getProfile(data.credits.crew).map((crew) => (
                    <div className="text-sm" key={crew.original_name}>
                      <p className="font-semibold">{crew.original_name}</p>
                      <p className="font-light">{crew.job?.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
          <div className="flex h-8 items-center gap-5 mt-12">
            <div className="text-sm grid gap-1">
              <p className="font-semibold">Status</p>
              <p>{data.status}</p>
            </div>
            <Separator orientation="vertical" />
            <div className="text-sm grid gap-1">
              <p className="font-semibold">Bahasa Ucapan</p>
              {data.spoken_languages.length ? (
                <p>
                  {data.spoken_languages
                    .map((spoken) => {
                      return spoken.english_name;
                    })
                    .join(", ")}
                </p>
              ) : (
                <p className="text-center">-</p>
              )}
            </div>
            <Separator orientation="vertical" />
            <div className="text-sm grid gap-1">
              <p className="font-semibold">Anggaran</p>
              <p>{formattedNumber(data.budget)}</p>
            </div>
            <Separator orientation="vertical" />
            <div className="text-sm grid gap-1">
              <p className="font-semibold">Pemasukan</p>
              <p>{formattedNumber(data.revenue)}</p>
            </div>
          </div>
          <Separator className="my-12" />
          <div className="mt-12">
            <h4>Pemeran Unggulan</h4>
            {data.credits.cast.length ? (
              <>
                <div className="py-5 overflow-x-auto grid grid-flow-col w-min max-w-full gap-5 scroll-bar">
                  {data.credits?.cast.slice(0, 10).map((castMember) => (
                    <div className="" key={castMember.id}>
                      <CardImage
                        className="w-40"
                        posterPath={castMember.profile_path}
                        alt="asdf"
                      />
                      <div className="grid gap-1 mt-3">
                        <p className="text-sm font-bold">
                          {castMember.original_name}
                        </p>
                        <p className="text-xs font-light">
                          {castMember.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-5" variant={"outline"}>
                  Kru dan Aktor Lainnya
                </Button>
              </>
            ) : (
              <p className="mt-5">Tidak ada pemeran unggulan</p>
            )}
          </div>
          <Separator className="my-12" />
          <div className="mb-24">
            <h4>Media</h4>
            <div className="mt-5">
              <Tabs defaultValue="video">
                <TabsList>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="gambar">Gambar</TabsTrigger>
                  <TabsTrigger value="poster">Poster</TabsTrigger>
                </TabsList>
                <TabsContent value="video" className="w-full">
                  {data.videos.results.length ? (
                    <div className="py-5 overflow-x-auto grid grid-flow-col w-min max-w-full gap-5 scroll-bar">
                      {data.videos?.results.map((video) => (
                        <Dialog key={video.id}>
                          <DialogTrigger>
                            <Card className="overflow-hidden relative border-none w-max">
                              <Image
                                className="aspect-video object-cover"
                                alt={video.name}
                                src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                                width={500}
                                height={500}
                                onDragStart={(e) => e.preventDefault()}
                                priority
                              />
                              <div className="bg-background/70 absolute flex items-center justify-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full">
                                <Play
                                  fill="white"
                                  strokeWidth={0}
                                  className="size-8 ms-1 my-0.5"
                                />
                              </div>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="max-w-screen-xl">
                            <DialogHeader>
                              <DialogTitle>{video.name}</DialogTitle>
                            </DialogHeader>
                            <iframe
                              className="rounded-lg w-full aspect-video"
                              src={`https://www.youtube.com/embed/${video.key}`}
                              title={video.name}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5">Tidak ada video</p>
                  )}
                </TabsContent>
                <TabsContent value="gambar">
                  {data.images.backdrops.length ? (
                    <div className="py-5 overflow-x-auto grid grid-flow-col w-min max-w-full gap-5 scroll-bar">
                      {data.images?.backdrops.map((backdrop) => (
                        <Link
                          href={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
                          target="_blank"
                          key={backdrop.file_path}
                        >
                          <CardImage
                            className="w-max"
                            posterPath={backdrop.file_path}
                            alt={backdrop.file_path}
                            video
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5">Tidak ada gambar</p>
                  )}
                </TabsContent>
                <TabsContent value="poster">
                  {data.images.posters.length ? (
                    <div className="py-5 overflow-x-auto grid grid-flow-col w-min max-w-full gap-5 scroll-bar">
                      {data.images?.posters.map((backdrop) => (
                        <Link
                          href={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
                          target="_blank"
                          key={backdrop.file_path}
                        >
                          <CardImage
                            className="w-[187px]"
                            posterPath={backdrop.file_path}
                            alt={backdrop.file_path}
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5">Tidak ada poster</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
