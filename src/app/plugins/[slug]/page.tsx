import PluginClient from "./PluginClient";
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
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/plugins?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Plugin não encontrado | Fonte dos Plugins",
      description: "Este Plugin não está disponível.",
    };
  }

  const { plugin } = await res.json();

  return {
    title: `${plugin.nome} | Download Plugin | Fonte dos Plugins`,
    description: plugin.subtitulo ?? `Baixe ${plugin.nome} agora.`,
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

  return <PluginClient slug={slug} />;
}
