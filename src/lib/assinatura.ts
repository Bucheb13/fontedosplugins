import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Verifica se a assinatura do usuário expirou.
 * Se expirou, inativa assinatura (status = "inativa", tipo = null, periodo_fim = null)
 */
export async function validarAssinatura(usuarioId: string, supabase: SupabaseClient) {
  const { data: assinatura, error } = await supabase
    .from("assinaturas")
    .select("*")
    .eq("usuario_id", usuarioId)
    .maybeSingle();

  if (error) {
    console.error("[Assinaturas] Erro ao buscar assinatura:", error);
    return;
  }

  if (assinatura?.periodo_fim && new Date(assinatura.periodo_fim) < new Date()) {
    await supabase
      .from("assinaturas")
      .update({ status: "inativa", tipo: null, periodo_fim: null })
      .eq("usuario_id", usuarioId);
    return false; // assinatura inativa
  }

  return assinatura?.status === "ativa"; // assinatura ativa
}
