import { NextResponse } from "next/server";
import { criarSupabaseServidor } from "@/lib/supabase-servidor";
import { gerarLinkAssinadoR2 } from "@/lib/r2-arquivos";

export async function POST(req: Request) {
  const supabase = await criarSupabaseServidor();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) {
    return NextResponse.json({ erro: "Você precisa estar logado." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const pluginId = body?.pluginId as string | undefined;

  if (!pluginId) {
    return NextResponse.json({ erro: "Dados inválidos" }, { status: 400 });
  }

  const agora = new Date();

  // 1) pega o plugin
  const { data: plugin, error: erroPlugin } = await supabase
    .from("plugins")
    .select("id, r2_chave_arquivo, ativo")
    .eq("id", pluginId)
    .single();

  if (erroPlugin || !plugin) {
    return NextResponse.json({ erro: "Plugin não encontrado" }, { status: 404 });
  }

  if (!plugin.ativo) {
    return NextResponse.json({ erro: "Plugin inativo" }, { status: 403 });
  }

  // 2) checa assinatura
  const { data: assinatura, error: erroAssinatura } = await supabase
    .from("assinaturas")
    .select("status")
    .eq("usuario_id", auth.user.id)
    .maybeSingle();

  if (erroAssinatura) {
    return NextResponse.json(
      { erro: "Falha ao consultar assinatura.", erroDetalhes: erroAssinatura.message },
      { status: 500 }
    );
  }

  const temAssinaturaAtiva = assinatura?.status === "ativa";

  // 3) se NÃO tem assinatura ativa, exige timer liberado
  if (!temAssinaturaAtiva) {
    const { data: downloadGratis, error: erroGratis } = await supabase
      .from("downloads_gratis")
      .select("id, liberar_em")
      .eq("usuario_id", auth.user.id)
      .eq("plugin_id", pluginId)
      .maybeSingle();

    if (erroGratis) {
      return NextResponse.json(
        { erro: "Falha ao validar o download grátis.", erroDetalhes: erroGratis.message },
        { status: 500 }
      );
    }

    const liberarEm = downloadGratis?.liberar_em ?? null;

    if (!liberarEm) {
      return NextResponse.json(
        {
          erro: "Você precisa iniciar o download grátis (15 min) antes.",
          liberar_em: null,
          agora_servidor: agora.toISOString(),
        },
        { status: 403 }
      );
    }

    const podeBaixar = new Date(liberarEm).getTime() <= agora.getTime();
    if (!podeBaixar) {
      return NextResponse.json(
        {
          erro: "Ainda não liberou. Aguarde o tempo.",
          liberar_em: liberarEm,
          agora_servidor: agora.toISOString(),
        },
        { status: 403 }
      );
    }
  }

  // 4) gera link assinado do R2
  const url = await gerarLinkAssinadoR2(plugin.r2_chave_arquivo);

  // 5) registra o download
  const { error: erroRegistrar } = await supabase.from("downloads").insert({
    usuario_id: auth.user.id,
    plugin_id: pluginId,
    criado_em: agora.toISOString(),
  });

  if (erroRegistrar) {
    return NextResponse.json(
      { erro: "Falha ao registrar o download.", erroDetalhes: erroRegistrar.message },
      { status: 500 }
    );
  }

  if (!temAssinaturaAtiva) {
    const { error: erroApagar } = await supabase
      .from("downloads_gratis")
      .delete()
      .eq("usuario_id", auth.user.id)
      .eq("plugin_id", pluginId);

    if (erroApagar) {
      return NextResponse.json({
        ok: true,
        url,
        aviso: "Download liberado, mas falhou ao limpar o timer.",
        erroDetalhes: erroApagar.message,
      });
    }
  }

  return NextResponse.json({ ok: true, url });
}