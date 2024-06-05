"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMovie } from "@/lib/type";
import { api } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { DataTable } from "../../data-table/data-table";
import { columns } from "./columns";
import Loader from "@/components/main/loader";

export default function SearchAdd() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IMovie[]>([]);

  const getMovie = async (query: string, page: number) => {
    setLoading(true);
    const { data: movie }: { data: IMovie[] } = await api.fetch(
      `/api/movie/search/${query}/${page}`
    );
    setData(movie);
    setLoading(false);
  };

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query");
    const page = formData.get("page");
    getMovie(query as string, page ? parseInt(page as string) : 1);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(e);
        }}
        className="grid grid-cols-5 gap-2 max-w-screen-sm mx-auto"
      >
        <Input
          autoComplete="false"
          className="col-span-2"
          placeholder="Cari..."
          name="query"
        />
        <Input
          autoComplete="false"
          className="col-span-1"
          placeholder="Halaman"
          name="page"
          type="number"
          min={1}
        />
        <Button className="col-span-2 font-bold">
          <Search className="size-4 me-2" strokeWidth={3} />
          Search
        </Button>
      </form>
      <div className="my-12">
        {loading ? (
          <div className="grid place-content-center">
            <Loader />
          </div>
        ) : (
          <DataTable
            data={data}
            columns={columns}
            filterColumns={[
              { placeholder: "Judul Asli", column: "original_title" },
              { placeholder: "Judul", column: "title" },
              { placeholder: "Ringkasan", column: "overview" },
              { placeholder: "Genre", column: "genre" },
            ]}
          />
        )}
      </div>
    </div>
  );
}
