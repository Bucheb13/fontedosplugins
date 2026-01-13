import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";
import { criarSupabaseServidor } from "@/lib/supabase-servidor";

export const runtime = "nodejs";

type TipoItem = "plugin" | "daw" | "drum-kit" | "programa";

function parseBody(body: unknown): { slug: string; tipo: TipoItem | "" } {
  if (!body || typeof body !== "object") return { slug: "", tipo: "" };
  const b = body as Record<string, unknown>;
  const slug = typeof b.slug === "string" ? b.slug.trim() : "";
  const tipo = typeof b.tipo === "string" ? (b.tipo as TipoItem) : "";
  return { slug, tipo };
}

function tabelaPorTipo(tipo: TipoItem) {
  if (tipo === "plugin") return "plugins";
  if (tipo === "daw") return "daws";
  if (tipo === "drum-kit") return "drum_kits";
  return "programas";
}

export async function POST(req: Request) {
  const supaUser = await criarSupabaseServidor();
  const { data: auth } = await supaUser.auth.getUser();
  const usuario_id = auth.user?.id;

  if (!usuario_id) {
    return NextResponse.json({ ok: false, erro: "Faça login." }, { status: 401 });
  }

  const bodyUnknown: unknown = await req.json().catch(() => null);
  const { slug, tipo } = parseBody(bodyUnknown);

  if (!slug) return NextResponse.json({ ok: false, erro: "Slug é obrigatório." }, { status: 400 });
  if (!tipo || !["plugin", "daw", "drum-kit", "programa"].includes(tipo)) {
    return NextResponse.json({ ok: false, erro: "Tipo inválido." }, { status: 400 });
  }

  const supa = criarSupabaseAdmin();
  const tabela = tabelaPorTipo(tipo);

  const { data: item } = await supa
    .from(tabela)
    .select("id, ativo")
    .eq("slug", slug)
    .single();

  if (!item || !item.ativo) {
    return NextResponse.json({ ok: false, erro: "Item indisponível." }, { status: 404 });
  }

  // apaga timer anterior desse item
  await supa
    .from("downloads_gratis")
    .delete()
    .eq("usuario_id", usuario_id)
    .eq("item_tipo", tipo)
    .eq("item_id", item.id);

  const liberar_em = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  const { data: timer, error } = await supa
    .from("downloads_gratis")
    .insert({ usuario_id, item_tipo: tipo, item_id: item.id, liberar_em })
    .select("id, liberar_em, criado_em")
    .single();

  if (error || !timer) {
    return NextResponse.json({ ok: false, erro: "Erro ao iniciar timer.", extra: error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, timer });
}
