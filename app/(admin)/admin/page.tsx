"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./dashboard/dashboard";
import Tambah from "./tambah/tambah";
import { LogOut } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen p-24 relative">
      <Button className="absolute right-24" variant={"outline"} asChild>
        <Link href={"/auth/logout"}>
          <LogOut className="size-4 me-2" />
          Logout
        </Link>
      </Button>
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger className="" value="dashboard">
            Dashboard
          </TabsTrigger>
          <TabsTrigger className="" value="tambah">
            Tambah
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-5">
          <Dashboard />
        </TabsContent>
        <TabsContent value="tambah" className="mt-5">
          <Tambah />
        </TabsContent>
      </Tabs>
    </main>
  );
}
