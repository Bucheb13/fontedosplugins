import DrumKitClient from "./DrumKitClient";
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
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/drum-kit?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Drum-Kit não encontrado | Fonte dos Plugins",
      description: "Este Drum-Kit não está disponível.",
    };
  }

  const { drumKit } = await res.json();

  return {
    title: `${drumKit.nome} | Download Drum-Kit | Fonte dos Plugins`,
    description: drumKit.subtitulo ?? `Baixe ${drumKit.nome} agora.`,
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

  return <DrumKitClient slug={slug} />;
}
