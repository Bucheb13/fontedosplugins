import { NextResponse } from "next/server";
import { gerarLinkAssinadoR2 } from "@/lib/r2-arquivos";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chave = searchParams.get("chave");

  if (!chave) {
    return NextResponse.json({ erro: "Chave ausente." }, { status: 400 });
  }

  const url = await gerarLinkAssinadoR2(chave);
  return NextResponse.redirect(url, 302);
}
