"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { animatePageOut } from "./animation";

export default function Form() {
  const router = useRouter();
  return (
    <form
      action={(data) => {
        animatePageOut(`/rekomendasi?keywords=${data.get("keywords")}`, router);
      }}
    >
      <div className="flex flex-row gap-2">
        <Input
          className="bg-background/50 border-primary"
          type="text"
          name="keywords"
          placeholder="Kata Kunci"
          autoComplete="off"
        />
        <Button
          className="text-primary border-primary bg-background/50"
          variant={"outline"}
        >
          <Search className="size-4 me-2" strokeWidth={2} /> Rekomendasi
        </Button>
      </div>
    </form>
  );
}
