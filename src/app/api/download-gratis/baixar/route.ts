import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";
import { criarSupabaseServidor } from "@/lib/supabase-servidor";
import { gerarLinkAssinadoR2 } from "@/lib/r2-arquivos";

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

  if (!usuario_id) return NextResponse.json({ ok: false, erro: "Faça login." }, { status: 401 });

  const bodyUnknown: unknown = await req.json().catch(() => null);
  const { slug, tipo } = parseBody(bodyUnknown);

  if (!slug) return NextResponse.json({ ok: false, erro: "Slug é obrigatório." }, { status: 400 });
  if (!tipo || !["plugin", "daw", "drum-kit", "programa"].includes(tipo)) {
    return NextResponse.json({ ok: false, erro: "Tipo inválido." }, { status: 400 });
  }

  const supa = criarSupabaseAdmin();
  const tabela = tabelaPorTipo(tipo);

  const { data: item, error: errItem } = await supa
    .from(tabela)
    .select("id, ativo, r2_chave_arquivo")
    .eq("slug", slug)
    .single();

  if (errItem || !item || !item.ativo || !item.r2_chave_arquivo) {
    return NextResponse.json({ ok: false, erro: "Item inválido." }, { status: 404 });
  }

  const { data: assinatura, error: errAss } = await supa
    .from("assinaturas")
    .select("status")
    .eq("usuario_id", usuario_id)
    .order("criado_em", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (errAss) {
    return NextResponse.json({ ok: false, erro: "Falha ao consultar assinatura.", extra: errAss }, { status: 500 });
  }

  const isAssinante = assinatura?.status === "ativa";

  let timerIdParaDeletar: string | null = null;

  if (!isAssinante) {
    const { data: timers, error: errTimer } = await supa
      .from("downloads_gratis")
      .select("id, liberar_em")
      .eq("usuario_id", usuario_id)
      .eq("item_tipo", tipo)
      .eq("item_id", item.id)
      .order("criado_em", { ascending: false })
      .limit(1);

    if (errTimer) {
      return NextResponse.json({ ok: false, erro: "Falha ao consultar timer.", extra: errTimer }, { status: 500 });
    }

    const timer = timers?.[0];
    if (!timer) return NextResponse.json({ ok: false, erro: "Inicie a contagem de 15 minutos." }, { status: 403 });

    const agoraMs = Date.now();
    const liberarEmMs = new Date(timer.liberar_em).getTime();

    if (agoraMs < liberarEmMs) {
      return NextResponse.json(
        { ok: false, erro: "Ainda não liberou.", liberar_em: timer.liberar_em, faltam_ms: liberarEmMs - agoraMs },
        { status: 403 }
      );
    }

    timerIdParaDeletar = timer.id;
  }

  const url = await gerarLinkAssinadoR2(item.r2_chave_arquivo);

  // registra download (genérico)
  const { error: errDownload } = await supa.from("downloads").insert({
    usuario_id,
    item_tipo: tipo,
    item_id: item.id,
  });

  if (errDownload) {
    return NextResponse.json({ ok: false, erro: "Falha ao registrar download.", extra: errDownload }, { status: 500 });
  }

  if (timerIdParaDeletar) {
    const { error: errDel } = await supa.from("downloads_gratis").delete().eq("id", timerIdParaDeletar);
    if (errDel) {
      return NextResponse.json(
        { ok: true, url, modo: "gratis", aviso: "Download liberado, mas falhou ao reiniciar timer.", extra: errDel },
        { status: 200 }
      );
    }
  }

  return NextResponse.json({ ok: true, url, modo: isAssinante ? "assinante" : "gratis" });
}
