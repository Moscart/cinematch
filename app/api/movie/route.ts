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
  const data = await request.json();

  const movies = await prisma.movie.create({
    data: data,
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
