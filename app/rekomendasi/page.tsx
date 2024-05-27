"use client";

import { CardImage } from "@/components/main/card_image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MESSAGE_NOT_FOUND } from "@/lib/constant";
import { recommendation } from "@/lib/serverUtils";
import { Movie } from "@prisma/client";
import { AlertCircle, ChevronLeft, Loader, Search } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sample({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const keywords = `${searchParams.keywords}`;
  const [data, setData] = useState<Movie[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const randomNumber = generateRandomNumber();

  useEffect(() => {
    recommendation(keywords)
      .then((res) => {
        setData(JSON.parse(res));
      })
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen">
      <div className="p-24 relative">
        <Button
          size={"lg"}
          className="absolute text-background font-bold rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, hsl(var(--primary)) 90%)",
          }}
          asChild
        >
          <Link href={"/"} className="flex justify-center items-center">
            <ChevronLeft className="h-4 w-4 ms-5 me-2" strokeWidth={3} />
            BACK
          </Link>
        </Button>
        <h1 className="text-center mb-24">Rekomendasi</h1>
        <form
          action={"/rekomendasi"}
          method="GET"
          className="max-w-screen-md m-auto"
        >
          <div className="flex flex-row gap-2">
            <Input
              className="bg-background"
              type="text"
              name="keywords"
              placeholder="Kata Kunci"
              autoComplete="off"
            />
            <Button className="text-background font-bold">
              <Search className="size-4 me-2" strokeWidth={3} /> Cari
            </Button>
          </div>
        </form>
      </div>
      {error && (
        <div className="p-24 pt-0 flex justify-center">
          <Card className="max-w-screen-md">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <AlertCircle className="size-4 me-2" />
                  Ups! Ada yang tidak beres
                </div>
              </CardTitle>
              <CardDescription>
                Kami tidak dapat mengambil data film.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Mohon bersabar sampai masalah ini teratasi. Anda dapat mencoba
              memuat ulang halaman atau kembali nanti.
            </CardContent>
          </Card>
        </div>
      )}
      {!!(!loading && data.length) && (
        <div className="p-24 pt-0">
          <div className="mx-auto max-w-screen-xl">
            <div className="grid grid-rows-1 gap-5">
              {data.map((movie, index) => (
                <div className="flex gap-5 flex-row" key={movie.id}>
                  <div className="basis-[15%]">
                    <CardImage
                      posterPath={movie.poster_path}
                      alt={`${movie.title}`}
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
                      asChild
                    >
                      <Link href={`detail/${movie.id}`} target="_blank">
                        Lihat Detail
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {!error && !loading && !data.length && (
        <div className="p-24 pt-0 flex justify-center">
          <Card className="max-w-screen-md">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <AlertCircle className="size-4 me-2" />
                  Film Tidak Ditemukan
                </div>
              </CardTitle>
              <CardDescription>Film tidak ditemukan</CardDescription>
            </CardHeader>
            <CardContent>{MESSAGE_NOT_FOUND[randomNumber]}</CardContent>
          </Card>
        </div>
      )}
      {loading && (
        <div className="p-24">
          <div className="flex flex-col justify-center items-center font-light">
            <p className="">Please Wait</p>
            <Loader className="size-4 mt-2 animate-spin" />
          </div>
        </div>
      )}
    </main>
  );
}
