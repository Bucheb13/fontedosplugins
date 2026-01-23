import ProgramaClient from "./ProgramaClient";
import type { Metadata } from "next";

/* =========================
   SEO DINÂMICO
========================= */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

  const { slug } = await params; // ✅ OBRIGATÓRIO

  console.log("SLUG NO METADATA:", slug);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/programas?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Programa não encontrado | Fonte dos Plugins",
      description: "Este Programa não está disponível.",
    };
  }

  const { programa } = await res.json();

  return {
    title: `${programa.nome} | Download Programa | Fonte dos Plugins`,
    description: programa.subtitulo ?? `Baixe ${programa.nome} agora.`,
  };
}

/* =========================
   PAGE (SERVER)
========================= */
export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // ✅ ESSENCIAL

  console.log("SLUG NO PAGE:", slug);

  return <ProgramaClient slug={slug} />;
}
