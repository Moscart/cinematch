import { NowPlaying } from "./components/now_playing";
import { Popular } from "./components/popular";
import { Upcoming } from "./components/upcoming";
import { api } from "@/lib/utils";
import { IMovie, IMovieList } from "@/lib/type";
import Background from "@/app/(user)/components/background";
import Parallax from "./components/parallax";
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
      <Background />
      <Parallax />
      <NowPlaying data={dataNowPlaying} />
      <Popular data={dataPopular} />
      <Upcoming data={dataUpcoming} />
    </main>
  );
}
