"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IMovie } from "@/lib/type";
import Link from "next/link";
import { api } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { DataTableColumnHeader } from "../../data-table/data-table-column-header";
import TextTruncate from "./read-more";

export function customColumns(
  render: number,
  setRender: Dispatch<SetStateAction<number>>
) {
  const columns: ColumnDef<IMovie>[] = [
    {
      accessorKey: "original_title",
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
      cell: ({ row }) => {
        const data = row.original;
        return <div>{TextTruncate({ text: data.overview as string })}</div>;
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
        const handleDelete = async () => {
          await api
            .fetch("/api/movie", {
              method: "DELETE",
              body: JSON.stringify(data),
            })
            .then(() => {
              toast.success("Film berhasil dihapus");
              setRender(render + 1);
            })
            .catch(() =>
              toast.success("Oops!", {
                description: "Gagal menghapus film",
              })
            );
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
                <Link href={`/detail/${data.id}`} target="_blank">
                  <DropdownMenuItem>
                    <Eye className="size-4 me-2" />
                    Lihat
                  </DropdownMenuItem>
                </Link>
                <Link href={`/detail/${data.id}`} target="_blank">
                  <DropdownMenuItem>
                    <Pencil className="size-4 me-2" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"destructive"}>
                      <Trash className="size-4 me-2" />
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <Button onClick={handleDelete} asChild>
                        <AlertDialogAction>Lanjutkan</AlertDialogAction>
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return { columns };
}
