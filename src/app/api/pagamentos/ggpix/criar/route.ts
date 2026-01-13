import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.usuario_id || !body.valor || !body.cpf || !body.nome) {
      return NextResponse.json({ erro: "Dados inválidos" }, { status: 400 });
    }

    const amountCents = Math.round(body.valor * 100);

    const res = await fetch("https://ggpixapi.com/api/v1/pix/in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.GGPIX_API_KEY!,
      },
      body: JSON.stringify({
        amountCents, // valor em centavos
        description: "Assinatura FonteDosPlugins",
        payerName: body.nome,
        payerDocument: body.cpf,
        externalId: `${body.usuario_id}-${Date.now()}`, // ⚠ importante
      })      
    });

    const pix = await res.json();

    if (!res.ok || !pix.pixCopyPaste) {
      console.error("Erro GGPix:", pix);
      return NextResponse.json(
        { erro: "Falha ao gerar PIX" },
        { status: res.status }
      );
    }

    const supabase = criarSupabaseAdmin();

    await supabase.from("pagamentos").insert({
      usuario_id: body.usuario_id,
      valor: body.valor,
      status: pix.status, // PENDING
      txid: pix.id,
      pix_copia_cola: pix.pixCopyPaste,
    });

    return NextResponse.json({
      qr_code_url: pix.pixCode,
      copia_cola: pix.pixCopyPaste,
    });
  } catch (err: unknown) {
    console.error("Erro criar PIX:", err);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}
