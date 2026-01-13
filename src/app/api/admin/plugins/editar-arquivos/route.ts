import { NextResponse } from "next/server";
import { criarSupabaseAdmin } from "@/lib/supabase-admin";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";


export const runtime = "nodejs";

function jsonErro(mensagem: string, status = 400) {
  return NextResponse.json({ erro: mensagem }, { status });
}

function extDaImagem(file: File): "png" | "jpg" | "webp" | "gif" | null {
  const ct = (file.type || "").toLowerCase();
  if (ct === "image/png") return "png";
  if (ct === "image/jpeg") return "jpg";
  if (ct === "image/webp") return "webp";
  if (ct === "image/gif") return "gif";

  const n = file.name.toLowerCase();
  if (n.endsWith(".png")) return "png";
  if (n.endsWith(".jpg") || n.endsWith(".jpeg")) return "jpg";
  if (n.endsWith(".webp")) return "webp";
  if (n.endsWith(".gif")) return "gif";

  return null;
}

function criarClienteR2() {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint) throw new Error("R2_ENDPOINT não configurado.");
  if (!accessKeyId) throw new Error("R2_ACCESS_KEY_ID não configurado.");
  if (!secretAccessKey) throw new Error("R2_SECRET_ACCESS_KEY não configurado.");

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function POST(req: Request) {
  const senha = req.headers.get("x-senha-admin");
  if (!senha || senha !== process.env.SENHA_ADMIN) {
    return jsonErro("Acesso negado.", 401);
  }

  const bucket = process.env.R2_BUCKET;
  if (!bucket) return jsonErro("R2_BUCKET não configurado.", 500);

  const publicBase = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL;
  if (!publicBase) {
    return jsonErro(
      "NEXT_PUBLIC_R2_PUBLIC_BASE_URL não configurado (necessário pra salvar a URL pública da capa).",
      500
    );
  }

  const form = await req.formData();
  const slug = String(form.get("slug") ?? "").trim();
  if (!slug) return jsonErro("slug é obrigatório.");

  const capa = form.get("capa");
  const torrent = form.get("torrent");

  if (!(capa instanceof File) && !(torrent instanceof File)) {
    return jsonErro("Envie pelo menos um arquivo: capa ou torrent.");
  }

  const r2 = criarClienteR2();
  const patch: Record<string, unknown> = {};

  const supabase = criarSupabaseAdmin();

  const { data: pluginAtual, error: erroBusca } = await supabase
    .from("plugins")
    .select("imagem_capa_url")
    .eq("slug", slug)
    .maybeSingle();
  
  if (erroBusca) {
    return jsonErro("Erro ao buscar plugin atual.", 500);
  }
  
  if (!pluginAtual) {
    return jsonErro("Plugin não encontrado.", 404);
  }
  

  // TORRENT
  if (torrent instanceof File) {
    if (!torrent.name.toLowerCase().endsWith(".torrent")) {
      return jsonErro("Envie um arquivo .torrent válido.");
    }

    const chaveTorrent = `plugins/torrents/${slug}.torrent`;

    await r2.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: chaveTorrent,
        Body: Buffer.from(await torrent.arrayBuffer()),
        ContentType: "application/x-bittorrent",
      })
    );

    patch.r2_chave_arquivo = chaveTorrent;
  }



  // CAPA
if (capa instanceof File) {
  const ext = extDaImagem(capa);
  if (!ext) return jsonErro("Formato inválido (png/jpg/webp/gif).");

  // 🔥 DELETAR CAPA ANTIGA (se existir)
  if (pluginAtual.imagem_capa_url) {
    const base = publicBase.replace(/\/$/, "");

    if (pluginAtual.imagem_capa_url.startsWith(base)) {
      const keyAntiga = pluginAtual.imagem_capa_url.replace(`${base}/`, "");

      try {
        await r2.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: keyAntiga,
          })
        );
      } catch (e) {
        console.warn("Falha ao deletar capa antiga:", keyAntiga);
      }
    }
  }

  // ✅ UPLOAD DA NOVA CAPA
  const chaveCapa = `plugins/capas/${slug}.${ext}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: chaveCapa,
      Body: Buffer.from(await capa.arrayBuffer()),
      ContentType: capa.type || `image/${ext}`,
    })
  );

  patch.imagem_capa_url = `${publicBase.replace(/\/$/, "")}/${chaveCapa}`;
}


  const { data, error } = await supabase
    .from("plugins")
    .update(patch)
    .eq("slug", slug)
    .select("id, slug, nome, subtitulo, imagem_capa_url, r2_chave_arquivo, ativo, criado_em");

  if (error) return jsonErro(error.message, 500);

  const plugin = data?.[0] ?? null;
  if (!plugin) {
    return jsonErro("Nenhuma linha foi atualizada (slug não encontrado).", 404);
  }

  return NextResponse.json({ ok: true, plugin });
}
