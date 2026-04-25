import type { Metadata } from "next";
import { AdminApp } from "./components/AdminApp";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin — La Feyssonne",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
