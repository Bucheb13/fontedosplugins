import { NextResponse } from "next/server";
import { criarSupabaseServidor } from "@/lib/supabase-servidor";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🟢 Body recebido:", body);

    const { assinaturaId } = body;

    if (!assinaturaId) {
      console.warn("⚠️ ID da assinatura não fornecido");
      return NextResponse.json({ erro: "ID da assinatura não fornecido" }, { status: 400 });
    }

    // Cria client do Supabase
    const supabase = await criarSupabaseServidor();
    console.log("🟢 Supabase client criado");

    const { data, error } = await supabase
      .from("assinaturas")
      .update({ status: "inativa", tipo: null, periodo_fim: null })
      .eq("id", assinaturaId);

    console.log("🟢 Resultado da atualização:", { data, error });

    if (error) {
      console.error("❌ Erro ao inativar assinatura:", error);
      return NextResponse.json({ erro: error.message }, { status: 500 });
    }

    console.log("✅ Assinatura inativada com sucesso", data);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("❌ Exception ao inativar assinatura:", err);
    return NextResponse.json({ erro: "Erro ao inativar assinatura" }, { status: 500 });
  }
}
