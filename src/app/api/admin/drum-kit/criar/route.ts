import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

function jsonErro(mensagem: string, status = 400) {
  return NextResponse.json({ erro: mensagem }, { status });
}

function criarClienteR2() {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 não configurado.");
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function extDaImagem(file: File): string | null {
  const ct = file.type.toLowerCase();
  if (ct.includes("png")) return "png";
  if (ct.includes("jpeg")) return "jpg";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("gif")) return "gif";
  return null;
}

export async function POST(req: Request) {
  /* ======================
     AUTH ADMIN
  ====================== */
  const senha = req.headers.get("x-senha-admin");
  if (senha !== process.env.SENHA_ADMIN) {
    return jsonErro("Acesso negado.", 401);
  }

  const form = await req.formData();

  /* ======================
     CAMPOS
  ====================== */
  const nome = String(form.get("nome") ?? "").trim();
  const slug = String(form.get("slug") ?? "").trim();
  const subtitulo = String(form.get("subtitulo") ?? "").trim() || null;
  const descricao = String(form.get("descricao") ?? "").trim() || null;
  const tipoInstalacao = String(form.get("tipo_instalacao") ?? "").trim();

  const conteudoInstalacao =
    String(form.get("conteudo_instalacao") ?? "").trim() || null;
  


  const ativo = String(form.get("ativo") ?? "true") === "true";

  const capa = form.get("capa");
  const torrent = form.get("torrent");

  if (!nome || !slug) return jsonErro("Nome e slug são obrigatórios.");
  if (tipoInstalacao !== "video" && tipoInstalacao !== "texto") {
    return jsonErro("Tipo de instalação inválido.");
  }
  
  if (!conteudoInstalacao) {
    return jsonErro(
      tipoInstalacao === "video"
        ? "URL do vídeo é obrigatória."
        : "Manual escrito é obrigatório."
    );
  }
  
  
  if (!(capa instanceof File)) return jsonErro("Capa obrigatória.");
  if (!(torrent instanceof File)) return jsonErro("Torrent obrigatório.");

  if (!torrent.name.endsWith(".torrent")) {
    return jsonErro("Arquivo torrent inválido.");
  }

  const ext = extDaImagem(capa);
  if (!ext) return jsonErro("Formato de imagem inválido.");

  const supabase = criarSupabaseAdmin();

  /* ======================
     VALIDAR SLUG ANTES
  ====================== */
  const { data: existente } = await supabase
    .from("drum_kits")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existente) {
    return jsonErro("Já existe um drum-kit com esse slug.");
  }

  /* ======================
     UPLOAD R2
  ====================== */
  const bucket = process.env.R2_BUCKET!;
  const r2 = criarClienteR2();

  const chaveCapa = `drum-kits/capas/${slug}.${ext}`;
  const chaveTorrent = `drum-kits/torrents/${slug}.torrent`;

  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: chaveCapa,
      Body: Buffer.from(await capa.arrayBuffer()),
      ContentType: capa.type,
    })
  );

  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: chaveTorrent,
      Body: Buffer.from(await torrent.arrayBuffer()),
      ContentType: "application/x-bittorrent",
    })
  );

  /* ======================
     INSERT SUPABASE
  ====================== */
  const { data, error } = await supabase
    .from("drum_kits")
    .insert({
      slug,
      nome,
      subtitulo,
      descricao,
      tipo_instalacao: tipoInstalacao,
    conteudo_instalacao: conteudoInstalacao,
    ativo,
    imagem_capa_url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL!.replace(/\/$/, "")}/${chaveCapa}`,
    r2_chave_arquivo: chaveTorrent,
  })
  .select()
  .single();

  if (error) {
    console.error("Erro Supabase:", error);

    if (error.code === "23505") {
      return jsonErro("Slug já está em uso.");
    }    

    return jsonErro("Erro ao criar o drum-kit.");
  }

  return NextResponse.json({ ok: true, drumKit: data });
}
