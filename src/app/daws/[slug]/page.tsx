import DawClient from "./DawClient";
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
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/daws?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "DAW não encontrada | Fonte dos Plugins",
      description: "Esta DAW não está disponível.",
    };
  }

  const { daw } = await res.json();

  return {
    title: `${daw.nome} | Download DAW | Fonte dos Plugins`,
    description: daw.subtitulo ?? `Baixe ${daw.nome} agora.`,
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

  return <DawClient slug={slug} />;
}
