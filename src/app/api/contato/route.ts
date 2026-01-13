import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // ex: smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,                      // true para porta 465
  auth: {
    user: process.env.SMTP_USER,     // fontedosplugins@gmail.com
    pass: process.env.SMTP_PASS,     // App Password ou senha de roteamento
  },
});

interface ContatoForm {
  nome: string;
  email: string;
  mensagem: string;
}

export async function POST(request: Request) {
  try {
    const data: ContatoForm = await request.json();

    // Validação básica
    if (!data.nome || !data.email || !data.mensagem) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Envia o email
    await transporter.sendMail({
        from: `"FonteDosPlugins" <suporte@fontedosplugins.com.br>`, // Remetente oficial
        to: "suporte@fontedosplugins.com.br",                        // Você mesmo
        replyTo: `${data.nome} <${data.email}>`,                     // Responder vai para o usuário
        subject: `Contato - ${data.nome}`,
        text: data.mensagem,
        html: `<p>${data.mensagem}</p><p>De: ${data.nome} &lt;${data.email}&gt;</p>`,
      });
      

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return NextResponse.json(
      { error: "Não foi possível enviar a mensagem" },
      { status: 500 }
    );
  }
}
