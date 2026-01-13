import { NextResponse } from "next/server";
import crypto from "crypto";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";

interface WebhookPayload {
  status: "PENDING" | "COMPLETE" | "FAILED" | "CANCELED";
  transactionId: string;
  externalId: string; // contém usuario_id + timestamp extra do GGPIX
  type: string; // PIX_IN, PIX_OUT, etc.
  amount?: number; // valor pago em centavos
  [key: string]: unknown;
}

function validarHmac(rawBody: string, signature: string, secret: string) {
  const parts = signature.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.replace("t=", "");
  const sig = parts.find((p) => p.startsWith("v1="))?.replace("v1=", "");

  if (!timestamp || !sig) return false;

  const age = Date.now() / 1000 - Number(timestamp);
  if (age > 300) return false;

  const payload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

function calcularPeriodoFim(valor: number): { periodoFim: Date; tipo: "mensal" | "anual" } {
    const hoje = new Date();
  
    // valores em centavos
    if (valor >= 1200) {
      // anual
      const fim = new Date(hoje);
      fim.setDate(fim.getDate() + 365);
      return { periodoFim: fim, tipo: "anual" };
    }
  
    // mensal (incluindo fallback <500)
    const fim = new Date(hoje);
    fim.setDate(fim.getDate() + 31);
    return { periodoFim: fim, tipo: "mensal" };
  }
  

export async function POST(req: Request) {
  const signature = req.headers.get("x-webhook-signature");
  const rawBody = await req.text();

  if (!signature || !validarHmac(rawBody, signature, process.env.GGPIX_WEBHOOK_SECRET!)) {
    return NextResponse.json({ erro: "Assinatura inválida ou ausente" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return NextResponse.json({ erro: "Payload inválido" }, { status: 400 });
  }

  if (payload.type !== "PIX_IN") return NextResponse.json({ ok: true });

  const supabase = criarSupabaseAdmin();

  // ✅ Extrair apenas UUID (36 caracteres) do externalId
  const usuarioId = payload.externalId.slice(0, 36);

  let statusPagamento: "pago" | "pendente" | "nao_pago" = "pendente";
  switch (payload.status) {
    case "COMPLETE":
      statusPagamento = "pago";
      break;
    case "FAILED":
    case "CANCELED":
      statusPagamento = "nao_pago";
      break;
  }

  try {
    console.log("[Webhook] Processando pagamento", payload.transactionId, statusPagamento);

    // Atualiza ou cria pagamento
    const { data: pagamentoExistente, error: errorPagamento } = await supabase
      .from("pagamentos")
      .select("*")
      .eq("txid", payload.transactionId)
      .maybeSingle();

    if (errorPagamento) {
      console.error("[Webhook] Erro ao buscar pagamento", errorPagamento);
      throw new Error(errorPagamento.message);
    }

    if (!pagamentoExistente) {
      await supabase.from("pagamentos").insert({
        txid: payload.transactionId,
        usuario_id: usuarioId,
        valor: payload.amount || 0,
        status: statusPagamento,
        criado_em: new Date(),
        atualizado_em: new Date(),
      });
      console.log("[Webhook] Pagamento criado");
    } else {
      await supabase
        .from("pagamentos")
        .update({ status: statusPagamento, atualizado_em: new Date() })
        .eq("txid", payload.transactionId);
      console.log("[Webhook] Pagamento atualizado");
    }

    // Atualiza assinatura se pagamento completo
    if (statusPagamento === "pago") {
      const { periodoFim, tipo } = calcularPeriodoFim(payload.amount || 0);

      const { data: assinaturaExistente, error: errorAssinatura } = await supabase
        .from("assinaturas")
        .select("*")
        .eq("usuario_id", usuarioId)
        .maybeSingle();

      if (errorAssinatura) {
        console.error("[Webhook] Erro ao buscar assinatura", errorAssinatura);
        throw new Error(errorAssinatura.message);
      }

      if (!assinaturaExistente) {
        await supabase.from("assinaturas").insert({
          usuario_id: usuarioId,
          status: "ativa",
          tipo: tipo,
          periodo_fim: periodoFim,
        });
        console.log("[Webhook] Assinatura criada");
      } else {
        await supabase
          .from("assinaturas")
          .update({ status: "ativa", tipo: tipo, periodo_fim: periodoFim })
          .eq("usuario_id", usuarioId);
        console.log("[Webhook] Assinatura atualizada");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[Webhook] Erro interno", err instanceof Error ? err.message : err);
    return NextResponse.json({ erro: "Erro interno ao processar webhook" }, { status: 500 });
  }
}
