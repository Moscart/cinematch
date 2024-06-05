import { GENRE_MOVIE } from "@/lib/constant";
import { translateToId } from "@/lib/serverUtils";
import { IMovieList } from "@/lib/type";
import { api, textPreprocessing } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { query: string; page: number } }
) {
  try {
    const query = params.query;
    const page = params.page;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    const { results: data }: IMovieList = await api.fetch(url);

    const overviews = data.map((movie) => movie.overview);
    const newData = await translateToId(overviews).then((res) => {
      const dataTranslate = JSON.parse(res);
      const newData = data.map((movie, index) => {
        const genre = movie.genre_ids
          .map((genre) => {
            return GENRE_MOVIE[genre];
          })
          .join(", ");
        movie.overview = dataTranslate[index].text;
        const genre_ids = movie.genre_ids.join(", ");

        const input = [movie.overview, movie.original_title, genre].join(" ");
        const words = textPreprocessing({ text: input }).join(", ");

        return {
          ...movie,
          genre: genre,
          genre_ids: genre_ids,
          words: words,
        };
      });
      return newData;
    });

    return NextResponse.json(
      {
        success: true,
        message: "Movie Created Successfully!",
        data: newData,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
