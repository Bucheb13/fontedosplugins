import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const clienteR2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function enviarArquivoParaR2(params: {
  chaveArquivo: string;
  buffer: Buffer;
  tipoConteudo: string;
}) {
  const comando = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: params.chaveArquivo,
    Body: params.buffer,
    ContentType: params.tipoConteudo,
  });

  await clienteR2.send(comando);
}

export async function gerarLinkAssinadoR2(chaveArquivo: string) {
  const cmd = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: chaveArquivo,
  });

  return getSignedUrl(clienteR2, cmd, { expiresIn: 60 * 10 });
}
