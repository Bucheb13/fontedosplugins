"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { criarSupabaseNavegador } from "@/lib/supabase-navegador";
import type { User } from "@supabase/supabase-js";

export type Assinatura = {
  status: "ativa" | "inativa";
  periodo_fim: string;
};

export function AcoesUsuarioCabecalho({
  assinatura: assinaturaProp,
}: {
  assinatura?: Assinatura | null;
}) {
  const supabase = criarSupabaseNavegador();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [assinatura, setAssinatura] = useState<Assinatura | null>(
    assinaturaProp ?? null
  );
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);
  const [saindo, setSaindo] = useState(false);

  // 🔥 Busca assinatura do usuário
  async function fetchAssinatura(userId: string) {
    const { data: a } = await supabase
      .from("assinaturas")
      .select("status, periodo_fim")
      .eq("usuario_id", userId)
      .maybeSingle();
    setAssinatura(a ?? null);
  }

  // 🔥 ESCUTA LOGIN / LOGOUT e assinatura em realtime
  useEffect(() => {
    let mounted = true;

    // Pega usuário inicial
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user);
      if (data.user) fetchAssinatura(data.user.id);
    });

    // Login / Logout
    const { data: authSub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      if (session?.user) fetchAssinatura(session.user.id);
      else setAssinatura(null);
    });

    // Assinaturas em realtime
    const assinaturaSub = supabase
  .channel("realtime-assinatura")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "assinaturas" },
    (payload) => {
      if (!mounted) return;

      const novo = payload.new as Partial<Assinatura> & { usuario_id?: string };

      if (novo.usuario_id && novo.usuario_id === user?.id) {
        setAssinatura(novo as Assinatura);
      }
    }
  )
  .subscribe();


    return () => {
      mounted = false;
      authSub.subscription.unsubscribe();
      supabase.removeChannel(assinaturaSub);
    };
  }, [supabase, user?.id]);

  // 🔥 Atualiza assinaturaAtiva a cada minuto
  useEffect(() => {
    function atualizarStatus() {
      if (!assinatura || assinatura.status !== "ativa") {
        setAssinaturaAtiva(false);
        return;
      }
      const agora = new Date().getTime();
      const fim = new Date(assinatura.periodo_fim).getTime();
      setAssinaturaAtiva(fim >= agora);
    }

    atualizarStatus(); // primeira vez
    const interval = setInterval(atualizarStatus, 60_000); // a cada minuto
    return () => clearInterval(interval);
  }, [assinatura]);

  const logado = !!user;
  const nomeExibicao =
    user?.user_metadata?.display_name || user?.email?.split("@")[0] || "Usuário";

  async function sair() {
    setSaindo(true);
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  function irParaAssinatura() {
    router.push(logado ? "/assinaturas" : "/login?retorno=/assinaturas");
  }

  
  return (
    <div className="flex items-center gap-5">
  {/* MENU */}
  <div className="hidden md:flex items-center gap-4 text-sm text-white/80">
    <Link
      href="/plugins"
      className="hover:text-white transition-all duration-300 transform hover:scale-105 hover:drop-shadow-[0_0_8px_cyan] hover:brightness-125"
    >
      Plugins
    </Link>
    <Link
      href="/drum-kit"
      className="hover:text-white transition-all duration-300 transform hover:scale-105 hover:drop-shadow-[0_0_8px_cyan] hover:brightness-125"
    >
      Drum-Kits
    </Link>
    <Link
      href="/daws"
      className="hover:text-white transition-all duration-300 transform hover:scale-105 hover:drop-shadow-[0_0_8px_cyan] hover:brightness-125"
    >
      DAWs
    </Link>
    <Link
      href="/programas"
      className="hover:text-white transition-all duration-300 transform hover:scale-105 hover:drop-shadow-[0_0_8px_cyan] hover:brightness-125"
    >
      Programas
    </Link>
  </div>

      {/* ASSINATURA / CTA */}
      {!assinaturaAtiva && (
        <button
          onClick={irParaAssinatura}
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300 backdrop-blur hover:bg-cyan-400/20 hover:border-cyan-300/60 transition shadow-[0_0_18px_rgba(34,211,238,0.25)]"
        >
          Apoiar / Assinar
        </button>
      )}

      {assinaturaAtiva && assinatura && (
        <span className="text-sm text-green-400">
          Assinatura ativa até:{" "}
          {new Date(assinatura.periodo_fim).toLocaleDateString("pt-BR")}
        </span>
      )}

      {!logado ? (
        <Link
          href="/login?retorno=/"
          className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
        >
          Entrar
        </Link>
      ) : (
        <>
          <Link
            href="/minha-conta"
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15"
          >
            Olá, {nomeExibicao}
          </Link>

          <button
            onClick={sair}
            disabled={saindo}
            className="text-sm text-white/50 hover:text-white disabled:opacity-50"
          >
            {saindo ? "Saindo..." : "Sair"}
          </button>
        </>
      )}
    </div>
  );
}
