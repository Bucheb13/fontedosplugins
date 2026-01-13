import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const senha = req.headers.get("x-senha-admin");
  if (!senha || senha !== process.env.SENHA_ADMIN) {
    return NextResponse.json({ ok: false, erro: "Acesso negado." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
