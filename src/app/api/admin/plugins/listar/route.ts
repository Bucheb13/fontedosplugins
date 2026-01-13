import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: Request) {
  const senha = req.headers.get("x-senha-admin");
  if (senha !== process.env.SENHA_ADMIN) {
    return NextResponse.json({ erro: "Acesso negado." }, { status: 401 });
  }

  const supabase = criarSupabaseAdmin();

  const { data, error } = await supabase
    .from("plugins")
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
    .order("criado_em", { ascending: false });

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ itens: data ?? [] });
}
