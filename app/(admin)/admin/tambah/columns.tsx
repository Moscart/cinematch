"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  PlusSquare,
  Save,
  Trash,
} from "lucide-react";
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

export const columns: ColumnDef<IMovie>[] = [
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
              <Link href={`/detail/${data.id}`} target="_blank">
                <DropdownMenuItem>
                  <Eye className="size-4 me-2" />
                  Lihat
                </DropdownMenuItem>
              </Link>
              <Link href={`/detail/${data.id}`} target="_blank">
                <DropdownMenuItem>
                  <Save className="size-4 me-2" />
                  Simpan ke database
                </DropdownMenuItem>
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
