// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { criarSupabaseServidor } from "@/lib/supabase-servidor";
import { AcoesUsuarioCabecalho } from "@/components/AcoesUsuarioCabecalho";
import ClientWrapper from "@/components/ClientWrapper"; // client

export const metadata: Metadata = {
  title: "FonteDosPlugins",
  description: "Plugins e conteúdos para produtores — rápido, moderno e direto.",
};

export default async function LayoutRaiz({ children }: { children: React.ReactNode }) {
  const supabase = await criarSupabaseServidor();
  const { data } = await supabase.auth.getUser();
  const usuario = data.user;

  let assinatura = null;
  if (usuario) {
    const { data: assinaturaDb } = await supabase
      .from("assinaturas")
      .select("status, periodo_fim")
      .eq("usuario_id", usuario.id)
      .maybeSingle();
    assinatura = assinaturaDb;
  }

  return (
    <html lang="pt-BR">
      <body className="corpo-site font-sans">
        {/* HEADER */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/imagens/LOGO-DEGRADE.png"
                alt="FonteDosPlugins"
                width={160}
                height={36}
                priority
                className="max-h-18 w-auto opacity-95 hover:opacity-100 transition"
              />
            </Link>
            <nav className="flex items-center gap-4">
              <AcoesUsuarioCabecalho assinatura={assinatura} />
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="relative mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

        {/* MODAL CLIENT-SIDE */}
        <ClientWrapper assinatura={assinatura} />

        {/* FOOTER */}
        <footer className="bg-black/90 text-white py-4 mt-10 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
              © {new Date().getFullYear()} FonteDosPlugins
            </span>
            <div className="flex gap-6 text-sm">
              <Link href="/contato" className="hover:underline text-white/70">Contato</Link>
              <Link href="/termos-de-uso" className="hover:underline text-white/70">Termos de Uso</Link>
              <Link href="/politica-de-privacidade" className="hover:underline text-white/70">Política de Privacidade</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
