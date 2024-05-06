import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { NowPlaying } from "./components/now_playing";
import { Popular } from "./components/popular";
import { Upcoming } from "./components/upcoming";
import { api } from "@/lib/utils";
import { IMovie, IMovieList } from "@/lib/type";
async function getNowPlaying() {
  let currentPage = 1;
  let maxPage = 0;
  const data: IMovie[] = [];

  do {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}&region=ID`;
    const { results: movies, total_pages }: IMovieList = await api.fetch(url);

    movies.map(async (movie) => {
      data.push(movie);
    });

    maxPage = total_pages;
    currentPage++;
  } while (currentPage <= maxPage);

  return data;
}

async function getPopular() {
  const data: IMovie[] = [];

  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1region=ID`;
  const { results: movies }: IMovieList = await api.fetch(url);

  movies.map((movie) => {
    data.push(movie);
  });

  return data;
}

async function getUpcoming() {
  let currentPage = 1;
  let maxPage = 0;
  const data: IMovie[] = [];

  do {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}&region=ID`;
    const { results: movies, total_pages }: IMovieList = await api.fetch(url);

    movies.map((movie) => {
      data.push(movie);
    });

    maxPage = total_pages;
    currentPage++;
  } while (currentPage <= maxPage);

  return data;
}

export default async function Home() {
  const dataNowPlaying = await getNowPlaying();
  const dataPopular = await getPopular();
  const dataUpcoming = await getUpcoming();

  return (
    <main className="min-h-screen">
      <nav className="text-xl absolute z-20 p-16 w-full text-center">
        CINE<span className="text-primary">MATCH</span>
      </nav>
      <div
        className="w-full bg-cover bg-center flex flex-col items-center justify-center relative z-10 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-background before:from-5% before:via-transparent before:to-95% before:to-background before:z-[-5] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-background after:via-transparent after:to-background after:z-[-5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--background) / .3), hsl(var(--background) / .3)), url(background.jpg)",
          height: "100vh",
        }}
      >
        <div className="p-24 w-1/2 max-w-screen-lg flex flex-col gap-5">
          <p className="text-5xl text-center font-semibold">
            <span className="text-primary">Temukan</span> Cerita yang Sesuai
            denganmu di Cine<span className="text-primary">match!</span>
          </p>
          <form action={"/rekomendasi"} method="GET">
            <div className="flex flex-row gap-2">
              <Input
                className="bg-background"
                type="text"
                name="keywords"
                placeholder="Kata Kunci"
                autoComplete="off"
              />
              <Button>
                <Search className="size-4 me-2" /> Cari
              </Button>
            </div>
          </form>
        </div>
      </div>
      <NowPlaying data={dataNowPlaying} />
      <Popular data={dataPopular} />
      <Upcoming data={dataUpcoming} />
    </main>
  );
}
