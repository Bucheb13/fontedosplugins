import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

function criarClienteR2() {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("Credenciais do R2 não configuradas.");
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}


type Body = {
  slug: string;
};

export async function POST(req: Request) {
  const senha = req.headers.get("x-senha-admin");
  if (!senha || senha !== process.env.SENHA_ADMIN) {
    return NextResponse.json({ erro: "Acesso negado." }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { slug?: string } | null;
  const slug = body?.slug?.trim();

  if (!slug) {
    return NextResponse.json({ erro: "slug é obrigatório." }, { status: 400 });
  }

  const supabase = criarSupabaseAdmin();

  // 🔹 Buscar programa
  const { data: programa, error: erroBusca } = await supabase
    .from("programas")
    .select("r2_chave_arquivo, imagem_capa_url")
    .eq("slug", slug)
    .maybeSingle();

  if (erroBusca) {
    return NextResponse.json({ erro: erroBusca.message }, { status: 500 });
  }

  if (!programa) {
    return NextResponse.json(
      { erro: "Programa não encontrado." },
      { status: 404 }
    );
  }

  const bucket = process.env.R2_BUCKET;
  if (!bucket) {
    return NextResponse.json(
      { erro: "R2_BUCKET não configurado." },
      { status: 500 }
    );
  }

  const r2 = criarClienteR2();

  // 🔹 Deletar TORRENT
  if (programa.r2_chave_arquivo) {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: programa.r2_chave_arquivo,
      })
    );
  }

  // 🔹 Deletar CAPA
  if (programa.imagem_capa_url) {
    const base = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.replace(/\/$/, "");
    if (base && programa.imagem_capa_url.startsWith(base)) {
      const key = programa.imagem_capa_url.replace(`${base}/`, "");

      await r2.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );
    }
  }

  // 🔹 Deletar do banco (por último)
  const { error: erroDelete } = await supabase
    .from("programas")
    .delete()
    .eq("slug", slug);

  if (erroDelete) {
    return NextResponse.json({ erro: erroDelete.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}