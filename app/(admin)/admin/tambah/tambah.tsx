"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMovie } from "@/lib/type";
import { api } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { DataTable } from "../../data-table/data-table";
import { customColumns } from "./columns";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export default function Tambah() {
  const [data, setData] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMovie = async (query: string, page: number) => {
    setIsLoading(true);
    try {
      const { data: movie }: { data: IMovie[] } = await api.fetch(
        `/api/movie/search/${query}/${page}`
      );
      setData(movie);
    } catch (error) {
      toast.error("Oops!", {
        description: "Terjadi Kesalahan",
      });
    }
    setIsLoading(false);
  };

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query");
    const page = formData.get("page");
    getMovie(query as string, page ? parseInt(page as string) : 1);
  };

  const { columns } = customColumns(setIsLoading);

  return (
    <Card className="p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(e);
        }}
        className="grid grid-cols-5 gap-2 max-w-screen-sm"
      >
        <Input
          autoComplete="off"
          className="col-span-3"
          placeholder="Cari..."
          name="query"
        />
        <Input
          autoComplete="off"
          className="col-span-1"
          placeholder="Halaman"
          name="page"
          type="number"
          min={1}
        />
        <Button className="col-span-1 font-bold text-background">
          <Search className="size-4 me-2" strokeWidth={3} />
          Cari
        </Button>
      </form>
      <div className="mt-5">
        <DataTable
          isLoading={isLoading}
          data={data}
          columns={columns}
          filterColumns={[
            { placeholder: "Judul Asli", column: "original_title" },
            { placeholder: "Judul", column: "title" },
            { placeholder: "Ringkasan", column: "overview" },
            { placeholder: "Genre", column: "genre" },
          ]}
        />
      </div>
    </Card>
  );
}
