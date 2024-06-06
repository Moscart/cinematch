import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { IMovieList } from "@/lib/type";
import { api, textPreprocessing } from "@/lib/utils";
import { translateToId } from "@/lib/serverUtils";
import { GENRE_MOVIE } from "@/lib/constant";

export async function GET() {
  const posts = await prisma.movie.findMany();

  return NextResponse.json(
    {
      sucess: true,
      message: "List Data Movie",
      data: posts,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
  const { url } = await request.json();

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

  const movies = await prisma.movie.createMany({
    data: newData,
    skipDuplicates: true,
  });

  return NextResponse.json(
    {
      success: true,
      message: "Movie Created Successfully!",
      data: movies,
    },
    { status: 201 }
  );
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  const movies = await prisma.movie.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "Movie Created Successfully!",
      data: movies,
    },
    { status: 201 }
  );
}
