"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../../data-table/data-table-column-header";
import { IMovie } from "@/lib/type";
import Link from "next/link";
import { api } from "@/lib/utils";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export function customColumns(setIsLoading: Dispatch<SetStateAction<boolean>>) {
  const columns: ColumnDef<IMovie>[] = [
    {
      accessorKey: "original_title",
      meta: "Judul",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Judul Asli" />;
      },
    },
    {
      accessorKey: "title",
      meta: "Judul",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Judul" />;
      },
    },
    {
      accessorKey: "overview",
      meta: "Ringkasan",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Ringkasan" />;
      },
    },
    {
      accessorKey: "genre",
      meta: "Genre",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Genre" />;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;
        const handleAdd = async () => {
          setIsLoading(true);
          await api
            .fetch("/api/movie", {
              method: "POST",
              body: JSON.stringify(data),
            })
            .then(() => toast.success("Film berhasil ditambahkan"))
            .catch(() =>
              toast.error("Oops!", {
                description: "Gagal menambahkan film",
              })
            )
            .finally(() => setIsLoading(false));
        };
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid gap-1">
                <Button className="justify-start" asChild variant={"ghost"}>
                  <Link href={`/detail/${data.id}`} target="_blank">
                    <DropdownMenuItem className="px-0">
                      <Eye className="size-4 me-2" />
                      Lihat
                    </DropdownMenuItem>
                  </Link>
                </Button>
                <Button
                  className="justify-start focus:ring-0"
                  onClick={handleAdd}
                  asChild
                  variant={"ghost"}
                >
                  <DropdownMenuItem>
                    <Save className="size-4 me-2" />
                    Tambah ke database
                  </DropdownMenuItem>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return { columns };
}
