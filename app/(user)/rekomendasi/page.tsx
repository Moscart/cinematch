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
import { recommendation } from "@/lib/serverUtils";
import { Movie } from "@prisma/client";
import { AlertCircle, Clapperboard, Loader, Search } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";

function Rekomendasi() {
  const [data, setData] = useState<Movie[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [random, setRandom] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywords = searchParams.get("keywords");
  const [isKeyword, setIsKeyword] = useState<boolean>(
    searchParams.has("keywords")
  );

  const MESSAGE_NOT_FOUND = [
    "Maaf, kami tidak menemukan film dengan kata kunci tersebut. Coba gunakan kata kunci yang berbeda atau periksa kembali pengetikannya.",
    "Hmm, sepertinya tidak ada film yang cocok dengan kata kunci yang Anda cari. Silakan coba dengan kata kunci lain.",
    "Maaf, tidak ada hasil untuk kata kunci yang Anda masukkan. Coba gunakan kata kunci yang lebih umum atau periksa ejaannya.",
    "Ups! Tidak ada film yang sesuai dengan kata kunci yang Anda cari. Silakan coba dengan kata kunci yang berbeda.",
    "Kami tidak dapat menemukan film yang cocok dengan kata kunci tersebut. Silakan periksa kembali kata kunci atau coba gunakan yang lain.",
    "Mohon maaf, kami tidak menemukan hasil film untuk kata kunci yang Anda masukkan. Coba ganti kata kunci atau gunakan kata yang lebih umum.",
    "Tidak ada film yang cocok dengan kata kunci Anda. Cobalah gunakan kata kunci lain atau periksa ejaannya.",
    "Hasil tidak ditemukan untuk kata kunci yang Anda masukkan. Mungkin Anda ingin mencoba kata kunci yang berbeda?",
    "Maaf, tidak ada film yang cocok dengan pencarian Anda. Coba gunakan kata kunci lain atau periksa kembali ejaannya.",
    "Kami tidak menemukan film berdasarkan kata kunci Anda. Mungkin cobalah kata kunci lain atau gunakan istilah yang lebih umum.",
  ];

  useEffect(() => {
    if (searchParams.has("keywords")) {
      setIsKeyword(true);
      setError(false);
      setLoading(true);
      recommendation(keywords ?? "")
        .then((res) => {
          setData(JSON.parse(res));
        })
        .catch(() => {
          setRandom(Math.floor(Math.random() * MESSAGE_NOT_FOUND.length));
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [keywords]);

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    router.push(`/rekomendasi?keywords=${formData.get("keywords")}`);
  };

  return (
    <main className="">
      <div className="p-24 pb-12">
        <h1 className="text-center mb-12 max-w-screen-md mx-auto uppercase">
          <span className="text-primary">Temukan</span> film yang cocok dengan{" "}
          <span className="text-primary">selera</span> mu!
        </h1>
        <form onSubmit={onSearch} className="max-w-screen-md m-auto">
          <div className="flex flex-row gap-2">
            <Input
              className="bg-background"
              type="text"
              name="keywords"
              placeholder="Masukkan kata kunci"
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
                    <p className="font-semibold text-lg mt-3">Genre</p>
                    <p className="font-light text-sm">
                      {movie.genre ? movie.genre : "Tidak ada genre"}
                    </p>
                    <p className="font-semibold text-lg mt-3">Ringkasan</p>
                    <p className="font-light text-sm">
                      {movie.overview ? movie.overview : "Tidak ada ringkasan"}
                    </p>
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
      {isKeyword && !error && !loading && !data.length && (
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
            <CardContent>{MESSAGE_NOT_FOUND[random]}</CardContent>
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
      {!isKeyword && !error && !loading && (
        <div className="p-24 pt-0 flex justify-center">
          <Card className="max-w-screen-md">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <Clapperboard className="size-4 me-2" />
                  Rekomendasi Film
                </div>
              </CardTitle>
              <CardDescription>
                Temukan film sesuai dengan preferensi Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              Masukkan kata kunci untuk mendapatkan rekomendasi film sesuai
              dengan preferensi Anda.
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}

export default function RekomendasiPage() {
  return (
    <Suspense>
      <Rekomendasi />
    </Suspense>
  );
}
