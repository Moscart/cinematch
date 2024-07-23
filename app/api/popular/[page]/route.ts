import { IMovieList } from "@/lib/type";
import { api } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { page: number } }
) {
  try {
    const page = params.page;
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=2022-01-01&primary_release_date.lte=2023-12-31&sort_by=popularity.desc&with_origin_country=ID&without_companies=198702%2C215214`;
    const data: IMovieList = await api.fetch(url);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
