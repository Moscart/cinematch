import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main>
      page
      <Button asChild>
        <Link href={"/admin/logout"}>Logout</Link>
      </Button>
    </main>
  );
}
