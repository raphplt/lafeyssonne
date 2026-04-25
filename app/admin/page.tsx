import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AdminApp } from "./components/AdminApp";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin — La Feyssonne",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return <AdminApp userEmail={user.email ?? ""} />;
}
