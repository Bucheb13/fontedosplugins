import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";

type Body = {
  slug: string;
  nome?: string;
  subtitulo?: string | null;
  descricao?: string | null;
  tipo_instalacao?: "video" | "texto";  
  conteudo_instalacao: string | null;
  ativo?: boolean;
};

type Patch = Partial<Omit<Body, "slug">>;

export async function POST(req: Request) {
  const senha = req.headers.get("x-senha-admin");
  if (senha !== process.env.SENHA_ADMIN) {
    return NextResponse.json({ erro: "Acesso negado." }, { status: 401 });
  }

  let body: Body;

  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ erro: "Body inválido." }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";

  if (!slug) {
    return NextResponse.json({ erro: "slug é obrigatório." }, { status: 400 });
  }

  const patch: Patch = {};

  if (typeof body.nome === "string") {
    patch.nome = body.nome.trim();
  }

  if (typeof body.subtitulo === "string") {
    patch.subtitulo = body.subtitulo.trim() || null;
  } else if (body.subtitulo === null) {
    patch.subtitulo = null;
  }

  if (typeof body.descricao === "string") {
    patch.descricao = body.descricao.trim() || null;
  } else if (body.descricao === null) {
    patch.descricao = null;
  }

  if (body.tipo_instalacao === "video" || body.tipo_instalacao === "texto") {
    patch.tipo_instalacao = body.tipo_instalacao;
  }
  
  if (typeof body.conteudo_instalacao === "string") {
    patch.conteudo_instalacao = body.conteudo_instalacao.trim() || null;
  }
  

  if (typeof body.ativo === "boolean") {
    patch.ativo = body.ativo;
  }
  // ===============================
// VALIDAR MANUAL DE INSTALAÇÃO
// ===============================
if (patch.tipo_instalacao === "video") {
  if (!patch.conteudo_instalacao) {
    return NextResponse.json(
      { erro: "URL do vídeo do YouTube é obrigatória." },
      { status: 400 }
    );
  }
}

if (patch.tipo_instalacao === "texto") {
  if (!patch.conteudo_instalacao) {
    return NextResponse.json(
      { erro: "O manual em texto é obrigatório." },
      { status: 400 }
    );
  }
}


  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { erro: "Nada para atualizar." },
      { status: 400 }
    );
  }

  const supabase = criarSupabaseAdmin();

  const { data, error } = await supabase
    .from("daws")
    .update(patch)
    .eq("slug", slug)
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
    .single();

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, daw: data });
}
