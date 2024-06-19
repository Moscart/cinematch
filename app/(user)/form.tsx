"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { animatePageOut } from "./animation";

export default function Form() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <form
      action={(data) => {
        if (pathname !== "/rekomendasi") {
          animatePageOut(
            `/rekomendasi?keywords=${data.get("keywords")}`,
            router
          );
        } else {
          router.push(`/rekomendasi?keywords=${data.get("keywords")}`);
        }
      }}
    >
      <div className="flex flex-row gap-2">
        <Input
          className="bg-background/50"
          type="text"
          name="keywords"
          placeholder="Masukkan kata kunci"
          autoComplete="off"
        />
        <Button className="" variant={"secondary"}>
          <Search className="size-4 me-2" strokeWidth={2} /> Cari
        </Button>
      </div>
    </form>
  );
}
