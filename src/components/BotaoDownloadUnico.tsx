"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TipoItem = "plugin" | "daw" | "drum-kit" | "programa";

type Props = {
  slug: string;
  tipo: TipoItem;
  assinanteAtivo?: boolean;
  className?: string;
};

type EstadoTimer = "nao_iniciado" | "aguardando" | "liberado";

function formatarTempo(segundos: number) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
}

function segundosRestantes(isoLiberarEm: string) {
  const liberarMs = new Date(isoLiberarEm).getTime();
  const agoraMs = Date.now();
  const diff = liberarMs - agoraMs;
  return Math.max(0, Math.ceil(diff / 1000));
}

function parseStatus(json: unknown): {
  status?: string;
  liberar_em?: string | null;
  faltam_ms?: number;
  erro?: string;
} {
  if (!json || typeof json !== "object") return {};
  const o = json as Record<string, unknown>;
  return {
    status: typeof o.status === "string" ? o.status : undefined,
    liberar_em: typeof o.liberar_em === "string" ? o.liberar_em : null,
    faltam_ms: typeof o.faltam_ms === "number" ? o.faltam_ms : undefined,
    erro: typeof o.erro === "string" ? o.erro : undefined,
  };
}

function extrairLiberarEmDoIniciar(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;

  const obj = json as Record<string, unknown>;
  if (!("timer" in obj)) return null;

  const timer = obj.timer;
  if (!timer || typeof timer !== "object") return null;

  const t = timer as Record<string, unknown>;
  return typeof t.liberar_em === "string" ? t.liberar_em : null;
}

export function BotaoDownloadUnico({ slug, tipo, assinanteAtivo = false, className }: Props) {
  const [carregando, setCarregando] = useState(true);
  const [clicando, setClicando] = useState(false);

  const [estado, setEstado] = useState<EstadoTimer>("nao_iniciado");
  const [liberarEm, setLiberarEm] = useState<string | null>(null);
  const [restante, setRestante] = useState<number>(0);

  const intervaloRef = useRef<number | null>(null);

  function limparIntervalo() {
    if (intervaloRef.current !== null) {
      window.clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  }

  function iniciarContador(iso: string) {
    setLiberarEm(iso);

    const inicial = segundosRestantes(iso);
    setRestante(inicial);

    limparIntervalo();
    intervaloRef.current = window.setInterval(() => {
      const s = segundosRestantes(iso);
      setRestante(s);

      if (s <= 0) {
        setEstado("liberado");
        limparIntervalo();
      }
    }, 250);
  }

 // ✅ Função para inativar assinatura expirada
async function inativarAssinaturaSeExpirada() {
  try {
    const res = await fetch("/api/assinaturas/me", { method: "GET" });
    if (!res.ok) return;

    const dados = await res.json();
    if (!dados?.assinatura) return;

    const { periodo_fim, status, id } = dados.assinatura;
    if (!periodo_fim || status !== "ativa") return;

    const agora = new Date();
    if (new Date(periodo_fim) < agora) {
      // Assinatura expirada, inativa
      await fetch("/api/assinaturas/inativar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assinaturaId: id }),
      });
    }
  } catch {
    // falha silenciosa
  }
}

  async function buscarStatus() {
    setCarregando(true);
    try {
      await inativarAssinaturaSeExpirada(); // verifica assinatura antes de buscar status

      if (assinanteAtivo) {
        limparIntervalo();
        setEstado("nao_iniciado");
        setLiberarEm(null);
        setRestante(0);
        return;
      }

      if (!slug || slug === "undefined") {
        setEstado("nao_iniciado");
        setLiberarEm(null);
        setRestante(0);
        return;
      }

      // ✅ agora manda tipo também
      const res = await fetch(
        `/api/download-gratis/status?slug=${encodeURIComponent(slug)}&tipo=${encodeURIComponent(tipo)}`,
        { method: "GET" }
      );

      const jsonRaw = await res.json().catch(() => null);
      const json = parseStatus(jsonRaw);

      if (!res.ok || !json.status) {
        setEstado("nao_iniciado");
        setLiberarEm(null);
        setRestante(0);
        return;
      }

      if (json.status === "nao_iniciado" || json.status === "sem_login") {
        setEstado("nao_iniciado");
        setLiberarEm(null);
        setRestante(0);
        return;
      }

      if (json.status === "contando" && json.liberar_em) {
        setEstado("aguardando");
        iniciarContador(json.liberar_em);
        return;
      }

      if (json.status === "liberado" && json.liberar_em) {
        setEstado("liberado");
        setLiberarEm(json.liberar_em);
        setRestante(0);
        return;
      }

      setEstado("nao_iniciado");
      setLiberarEm(null);
      setRestante(0);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void buscarStatus();
    return () => limparIntervalo();
    // ✅ inclui tipo nas dependências também
  }, [slug, tipo, assinanteAtivo]);

  async function iniciarGratis() {
    const res = await fetch("/api/download-gratis/iniciar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // ✅ agora manda tipo também
      body: JSON.stringify({ slug, tipo }),
    });

    const jsonRaw = await res.json().catch(() => null);
    const json = parseStatus(jsonRaw);

    if (!res.ok) {
      throw new Error(json.erro ?? "Não foi possível iniciar a contagem.");
    }

    const liberar_em = extrairLiberarEmDoIniciar(jsonRaw);
    if (!liberar_em) {
      throw new Error("Resposta inválida do servidor (liberar_em ausente).");
    }

    setEstado("aguardando");
    iniciarContador(liberar_em);
  }

  async function tentarBaixarDireto() {
    const res = await fetch("/api/download-gratis/baixar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // ✅ agora manda tipo também
      body: JSON.stringify({ slug, tipo }),
    });

    const jsonRaw = await res.json().catch(() => null);
    const json = parseStatus(jsonRaw);

    if (res.status === 401) {
      window.location.href = `/login?retorno=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    if (res.ok) {
      const url =
        jsonRaw && typeof jsonRaw === "object" ? (jsonRaw as Record<string, unknown>).url : null;

      if (typeof url !== "string" || !url) {
        throw new Error("Resposta inválida do servidor (url ausente).");
      }

      window.location.href = url;
      return;
    }

    if (json.liberar_em) {
      const s = segundosRestantes(json.liberar_em);
      if (s > 0) {
        setEstado("aguardando");
        iniciarContador(json.liberar_em);
      } else {
        setEstado("liberado");
        setLiberarEm(json.liberar_em);
        setRestante(0);
      }
      return;
    }

    throw new Error(json.erro ?? "Não foi possível baixar agora.");
  }

  async function aoClicar() {
    if (clicando) return;
    setClicando(true);

    try {
      await tentarBaixarDireto();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro inesperado.";

      if (msg.toLowerCase().includes("inicie a contagem")) {
        try {
          await iniciarGratis();
        } catch (e2) {
          alert(e2 instanceof Error ? e2.message : "Erro inesperado.");
        }
      } else {
        alert(msg);
      }
    } finally {
      setClicando(false);
    }
  }

  let texto = "Baixar";
  if (carregando) texto = "Carregando...";
  else if (assinanteAtivo) texto = "Baixar agora";
  else if (estado === "nao_iniciado") texto = "Baixar";
  else if (estado === "aguardando") texto = `Liberando em ${formatarTempo(restante)}`;
  else if (estado === "liberado") texto = "Baixar agora";

  const desabilitado = useMemo(() => {
    return clicando || (!assinanteAtivo && estado === "aguardando");
  }, [clicando, estado, assinanteAtivo]);

  return (
    <button
      type="button"
      onClick={() => void aoClicar()}
      disabled={desabilitado}
      className={
        className ??
        "w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white backdrop-blur transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {texto}
    </button>
  );
}
