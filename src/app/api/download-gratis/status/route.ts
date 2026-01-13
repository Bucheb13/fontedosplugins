import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";
import { criarSupabaseServidor } from "@/lib/supabase-servidor";

export const runtime = "nodejs";

type TipoItem = "plugin" | "daw" | "drum-kit" | "programa";

function tabelaPorTipo(tipo: TipoItem) {
  if (tipo === "plugin") return "plugins";
  if (tipo === "daw") return "daws";
  if (tipo === "drum-kit") return "drum_kits";
  return "programas";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = (searchParams.get("slug") || "").trim();
  const tipo = (searchParams.get("tipo") || "").trim() as TipoItem;

  if (!slug) return NextResponse.json({ ok: false, erro: "Slug é obrigatório." }, { status: 400 });
  if (!tipo || !["plugin", "daw", "drum-kit", "programa"].includes(tipo)) {
    return NextResponse.json({ ok: false, erro: "Tipo inválido." }, { status: 400 });
  }

  const supaUser = await criarSupabaseServidor();
  const { data: auth } = await supaUser.auth.getUser();
  const usuario_id = auth.user?.id;

  if (!usuario_id) return NextResponse.json({ ok: true, status: "sem_login" });

  const supa = criarSupabaseAdmin();
  const tabela = tabelaPorTipo(tipo);

  const { data: item } = await supa.from(tabela).select("id").eq("slug", slug).single();
  if (!item) return NextResponse.json({ ok: false, erro: "Item não encontrado." }, { status: 404 });

  const { data: timers, error: errTimer } = await supa
    .from("downloads_gratis")
    .select("liberar_em, criado_em")
    .eq("usuario_id", usuario_id)
    .eq("item_tipo", tipo)
    .eq("item_id", item.id)
    .order("criado_em", { ascending: false })
    .limit(1);

  if (errTimer) return NextResponse.json({ ok: false, erro: "Falha ao consultar timer." }, { status: 500 });

  const timer = timers?.[0];
  if (!timer) return NextResponse.json({ ok: true, status: "nao_iniciado" });

  const now = Date.now();
  const liberarEm = new Date(timer.liberar_em).getTime();

  if (now < liberarEm) {
    return NextResponse.json({
      ok: true,
      status: "contando",
      liberar_em: timer.liberar_em,
      faltam_ms: liberarEm - now,
    });
  }

  return NextResponse.json({ ok: true, status: "liberado", liberar_em: timer.liberar_em });
}
