import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type TipoInstalacao = "video" | "texto";

type ProgramasPublico = {
  id: string;
  slug: string;
  nome: string;
  subtitulo: string | null;
  imagem_capa_url: string | null;
  descricao: string | null;
  tipo_instalacao: TipoInstalacao;
  conteudo_instalacao: string | null;
  ativo: boolean;
};

export async function GET(req: Request) {
  const supabase = criarSupabaseAdmin();
  const url = new URL(req.url);

  const slug = url.searchParams.get("slug");
  const q: string | null = url.searchParams.get("q"); // ✅ parâmetro de pesquisa

  // ✅ CASO 1: obter 1 Programa por slug
  if (slug) {
    const { data, error } = await supabase
      .from("programas")
      .select(
        "id, slug, nome, subtitulo, imagem_capa_url, descricao, tipo_instalacao, conteudo_instalacao, ativo"
      )
      .eq("slug", slug)
      .eq("ativo", true)
      .maybeSingle();

    if (error) return NextResponse.json({ erro: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ erro: "Programa não encontrado." }, { status: 404 });

    return NextResponse.json({ programa: data as ProgramasPublico });
  }

  // ✅ CASO 2: listar todos ou filtrar por pesquisa
  let query = supabase
    .from("programas")
    .select(
      "id, slug, nome, subtitulo, imagem_capa_url, descricao, tipo_instalacao, conteudo_instalacao, ativo"
    )
    .eq("ativo", true)
    .order("criado_em", { ascending: false });

  if (q && q.length > 0) {
    // pesquisa em nome e subtitulo
    query = query.or(`nome.ilike.%${q}%,subtitulo.ilike.%${q}%`);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 });

  return NextResponse.json({ programas: (data ?? []) as ProgramasPublico[] });
}
