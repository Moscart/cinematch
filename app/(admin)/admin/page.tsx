"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./dashboard/dashboard";
import Tambah from "./tambah/tambah";
import { LogOut } from "lucide-react";
import { animatePageOut } from "../animation";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen p-24 relative">
      <Button
        className="absolute right-24"
        variant={"outline"}
        onClick={() => animatePageOut("/auth/logout", router)}
      >
        <LogOut className="size-4 me-2" />
        Logout
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
