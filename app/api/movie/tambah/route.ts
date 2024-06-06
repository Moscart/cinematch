import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
