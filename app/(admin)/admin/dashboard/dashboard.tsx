"use client";

import { customColumns } from "./columns";
import { IMovie } from "@/lib/type";
import { api } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/data-table";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
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
    <Card className="p-5">
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
    </Card>
  );
}
