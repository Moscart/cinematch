"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "../data-table/data-table";
import { customColumns } from "./columns";
import { IMovie } from "@/lib/type";
import { api } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<IMovie[]>([]);
  const [render, setRender] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMovie = async () => {
    setIsLoading(true);
    const { data: movie }: { data: IMovie[] } = await api.fetch(`/api/movie/`);
    setData(movie);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, [render]);

  const { columns } = customColumns(render, setRender);

  return (
    <main className="min-h-screen p-24">
      <div className="max-w-screen-xl mx-auto">
        page
        <Button asChild>
          <Link href={"/auth/logout"}>Logout</Link>
        </Button>
      </div>
      <div className="my-12">
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={data}
          filterColumns={[
            { placeholder: "Judul", column: "original_title" },
            { placeholder: "Ringkasan", column: "overview" },
            { placeholder: "Genre", column: "genre" },
          ]}
        />
      </div>
    </main>
  );
}
