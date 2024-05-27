import { api } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Cvideos%2Cimages&include_video_language=null,en,id&include_image_language=null,en,id`;
    const data = await api.fetch(url);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
