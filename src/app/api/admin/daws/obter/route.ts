import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: Request) {
  const senha = req.headers.get("x-senha-admin");
  if (senha !== process.env.SENHA_ADMIN) {
    return NextResponse.json({ erro: "Acesso negado." }, { status: 401 });
  }

  const slug = new URL(req.url).searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ erro: "slug é obrigatório." }, { status: 400 });
  }

  const supabase = criarSupabaseAdmin();

  const { data, error } = await supabase
    .from("daws")
    .select(`
      id,
      slug,
      nome,
      subtitulo,
      imagem_capa_url,
      r2_chave_arquivo,
      descricao,
      tipo_instalacao,
      conteudo_instalacao,
      ativo
    `)    
    .eq("slug", slug)
    .single();

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ daw: data });
}
