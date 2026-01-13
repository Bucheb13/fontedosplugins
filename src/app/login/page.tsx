"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { criarSupabaseNavegador } from "@/lib/supabase-navegador";
import { CyberToast } from "@/components/CyberToast";

function normalizarNomeUsuario(nome: string) {
  return nome.trim().replace(/\s+/g, " ");
}

async function inativarAssinaturaSeExpirada(
  supabase: ReturnType<typeof criarSupabaseNavegador>,
  usuarioId: string
) {
  const { data: assinatura } = await supabase
    .from("assinaturas")
    .select("*")
    .eq("usuario_id", usuarioId)
    .maybeSingle();

  if (
    assinatura?.periodo_fim &&
    new Date(assinatura.periodo_fim) < new Date()
  ) {
    await supabase
      .from("assinaturas")
      .update({ status: "inativa", tipo: null, periodo_fim: null })
      .eq("usuario_id", usuarioId);
  }
}

type Modo = "entrar" | "criar";
type ToastType = "success" | "error" | "info";

export default function PaginaLogin() {
  const supabase = useMemo(() => criarSupabaseNavegador(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const retorno =
  searchParams.get("redirect") ||
  searchParams.get("retorno") ||
  "/";

  const [modo, setModo] = useState<Modo>("entrar");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  function showToast(message: string, type: ToastType = "info") {
    setToast({ message, type });
  }

  // ----------------------------
  // LOGIN
  // ----------------------------
  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: senha,
      });

      if (error || !data.user) {
        setCarregando(false);
        showToast(
          "Não foi possível entrar. Verifique seus dados ou confirme seu e-mail.",
          "error"
        );
        return;
      }

      await inativarAssinaturaSeExpirada(supabase, data.user.id);
      router.replace(retorno);
    } catch {
      setCarregando(false);
      showToast("Erro inesperado ao tentar entrar.", "error");
    }
  }

  // ----------------------------
  // CRIAR CONTA
  // ----------------------------
  async function criarConta(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    const nome = normalizarNomeUsuario(nomeUsuario);

    if (nome.length < 2) {
      setCarregando(false);
      showToast("Informe um nome válido.", "error");
      return;
    }

    if (senha.length < 6) {
      setCarregando(false);
      showToast("Senha deve ter no mínimo 6 caracteres.", "error");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: {
          data: { display_name: nome },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      setCarregando(false);

      if (error) {
        showToast("Erro ao tentar criar conta.", "error");
        return;
      }

      // ✅ Mensagem neutra (única forma correta)
      showToast(
        "Cadastro realizado! Verifique seu e-mail para confirmar seu cadastro.",
        "info"
      );
    } catch {
      setCarregando(false);
      showToast("Erro inesperado ao criar conta.", "error");
    }
  }

  // ----------------------------
  // REDEFINIR SENHA
  // ----------------------------
  async function redefinirSenha() {
    if (!email) {
      showToast("Informe seu e-mail para redefinir a senha.", "info");
      return;
    }

    setCarregando(true);

    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      });

      setCarregando(false);
      showToast(
        "Se este e-mail estiver cadastrado, enviaremos um link.",
        "info"
      );
    } catch {
      setCarregando(false);
      showToast("Erro ao enviar e-mail de redefinição.", "error");
    }
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <h1 className="text-2xl tracking-tight">FonteDosPlugins</h1>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/20 p-1">
          <button
            type="button"
            onClick={() => setModo("entrar")}
            className={`rounded-lg px-3 py-2 text-sm ${
              modo === "entrar" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setModo("criar")}
            className={`rounded-lg px-3 py-2 text-sm ${
              modo === "criar" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            Criar conta
          </button>
        </div>

        <form
          onSubmit={modo === "entrar" ? entrar : criarConta}
          className="mt-4 space-y-3"
        >
          {modo === "criar" && (
            <input
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              placeholder="Nome de usuário"
              className="w-full rounded-xl bg-black/30 px-3 py-2 text-sm"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-xl bg-black/30 px-3 py-2 text-sm"
          />

          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            placeholder="Senha"
            required
            className="w-full rounded-xl bg-black/30 px-3 py-2 text-sm"
          />

          {modo === "entrar" && (
            <button
              type="button"
              onClick={redefinirSenha}
              className="text-xs text-cyan-400 hover:underline"
            >
              Esqueci minha senha
            </button>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            {carregando
              ? "Processando..."
              : modo === "entrar"
              ? "Entrar"
              : "Criar conta"}
          </button>
        </form>
      </div>

      {toast && (
        <CyberToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
