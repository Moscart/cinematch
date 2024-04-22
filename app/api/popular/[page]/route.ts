import { IMovieList } from "@/lib/type";
import { api } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { page: number } }
) {
  try {
    const page = params.page;
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&region=ID`;
    const data: IMovieList = await api.fetch(url);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
