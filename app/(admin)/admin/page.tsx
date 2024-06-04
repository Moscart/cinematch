"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { IMovie } from "@/lib/type";
import { api } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<IMovie[]>([]);

  const getMovie = async () => {
    const { data: movie }: { data: IMovie[] } = await api.fetch(`/api/movie/`);
    setData(movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <main className="min-h-screen p-24">
      <div className="max-w-screen-xl mx-auto">
        page
        <Button asChild>
          <Link href={"/auth/logout"}>Logout</Link>
        </Button>
      </div>
      <div className="my-12">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
