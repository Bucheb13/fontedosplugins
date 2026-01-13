"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ModalRedefinirSenha } from "@/components/ModalRedefinirSenha";

type StatusAssinatura = "ativa" | "inativa";
type ItemTipo = "plugin" | "drum-kit" | "daw" | "programa";

type ItemResolvido = {
  id: string;
  nome: string;
  slug: string;
  tipo: ItemTipo;
};

type DownloadFinal = {
  id: string;
  criado_em: string;
  item?: ItemResolvido;
};

type DadosMinhaConta = {
  usuario: {
    email: string;
    user_metadata?: { display_name?: string };
  };
  statusAssinatura: StatusAssinatura;
  labelAssinatura: string;
  totalDownloads: number;
  listaDownloads: DownloadFinal[];
};

/* =========================
   HELPERS
========================= */
function formatarData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function labelTipo(tipo: ItemTipo) {
  switch (tipo) {
    case "plugin":
      return "Plugin";
    case "drum-kit":
      return "Drum-Kit";
    case "daw":
      return "DAW";
    case "programa":
      return "Programa";
  }
}

function formatarEmail(email: string) {
  return email.toLowerCase();
}

/* =========================
   INFO CARD
========================= */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:scale-[1.02] hover:border-white/20 animate-float">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 transition group-hover:opacity-100 neon-pulse" />
      <div className="relative">
        <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
        <div className="mt-1 text-lg">{value}</div>
      </div>
    </div>
  );
}

/* =========================
   PAGINA MINHA CONTA
========================= */
export default function PaginaMinhaConta() {
  const [dados, setDados] = useState<DadosMinhaConta | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      const res = await fetch("/api/minha-conta");
      if (!res.ok) {
        window.location.href = "/login?retorno=/minha-conta";
        return;
      }
      const json: DadosMinhaConta = await res.json();
      setDados(json);
    }

    carregarDados();
  }, []);

  if (!dados) return null;

  const nomeExibicao =
    dados.usuario.user_metadata?.display_name?.trim() ||
    dados.usuario.email.split("@")[0].toLowerCase() ||
    "usuário";

  const emailExibicao = formatarEmail(dados.usuario.email);

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
      {/* INFO CARDS */}
      <section className="grid gap-4 md:grid-cols-4">
        <Info label="Nome" value={nomeExibicao} />
        <Info label="Email" value={emailExibicao} />
        <Info label="Downloads" value={String(dados.totalDownloads ?? 0)} />
        <Info label="Assinatura" value={dados.labelAssinatura} />
      </section>

      {/* ACTIONS */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          onClick={() => setModalAberto(true)}
          className="group relative overflow-hidden rounded-xl border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium transition hover:scale-[1.03] neon-pulse"
        >
          <span className="relative z-10">Redefinir senha</span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-0 transition group-hover:opacity-100" />
        </button>

        {dados.statusAssinatura === "inativa" ? (
          <Link
            href="/assinaturas"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-6 py-2 text-sm text-black transition hover:scale-[1.05] neon-pulse"
          >
            <span className="relative z-10 flex items-center gap-2">⚡ Assinar agora</span>
            <span className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-80 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
          </Link>
        ) : (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs text-emerald-300 neon-pulse">
            ✔ {dados.labelAssinatura}
          </span>
        )}
      </div>

      <ModalRedefinirSenha aberto={modalAberto} onFechar={() => setModalAberto(false)} />

      {/* DOWNLOADS */}
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg">Meus downloads</h2>
          <span className="text-xs text-white/60">{dados.totalDownloads ?? 0} no total</span>
        </div>

        {dados.listaDownloads.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center text-sm text-white/70 animate-float">
            Nenhum download encontrado
          </div>
        ) : (
          <ul className="space-y-3">
            {dados.listaDownloads.map((d) => (
              <li
                key={d.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4 transition hover:scale-[1.02] hover:border-white/25 animate-float"
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 blur-xl neon-pulse" />
                </div>

                <div className="relative">
                  <div className="truncate text-sm">{d.item?.nome ?? "Item removido"}</div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
                    <span>{formatarData(d.criado_em)}</span>

                    {d.item?.tipo && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest neon-pulse">
                        {labelTipo(d.item.tipo)}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
