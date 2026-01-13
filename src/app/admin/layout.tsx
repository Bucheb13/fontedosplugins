import type { ReactNode } from "react";
import { AdminProvider } from "@/components/admin/admin-contexto";
import HeaderAdmin from "@/components/admin/HeaderAdmin";

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen">
        <HeaderAdmin />
        <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      </div>
    </AdminProvider>
  );
}
