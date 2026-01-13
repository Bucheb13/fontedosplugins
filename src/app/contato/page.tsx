"use client";

import { useState } from "react";
import { CyberToast } from "@/components/CyberToast";// ajuste o caminho conforme sua pasta

export default function PaginaContato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState<"idle" | "enviando" | "success" | "error">("idle");

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault();
    setStatus("enviando");

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      if (res.ok) {
        setStatus("success");
        setNome("");
        setEmail("");
        setMensagem("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center">
      {/* Card centralizado */}
      <div className="bg-black/20 backdrop-blur-md rounded-3xl max-w-2xl w-full px-10 py-14 text-white shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Contato</h1>
        <p className="mb-6 text-white/70 text-center">
          Entre em contato conosco. Responderemos o mais rápido possível.
        </p>

        <form onSubmit={enviarFormulario} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nome</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/30 px-3 py-2 text-white focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/30 px-3 py-2 text-white focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Mensagem</label>
            <textarea
              required
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/30 px-3 py-2 text-white focus:ring-2 focus:ring-purple-400"
              rows={5}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 px-5 py-3 font-semibold text-black hover:scale-105 transition"
          >
            {status === "enviando" ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>

      {/* CyberToast */}
      {status === "success" && (
        <CyberToast
          message="Mensagem enviada com sucesso!"
          type="success"
          onClose={() => setStatus("idle")}
        />
      )}
      {status === "error" && (
        <CyberToast
          message="Erro ao enviar. Tente novamente."
          type="error"
          onClose={() => setStatus("idle")}
        />
      )}
    </main>
  );
}
