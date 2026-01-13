"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { criarSupabaseNavegador } from "@/lib/supabase-navegador";
import { CyberToast } from "@/components/CyberToast";

type ToastType = "success" | "error" | "info";

export default function RedefinirSenha() {
  const supabase = useMemo(() => criarSupabaseNavegador(), []);
  const router = useRouter();

  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [sessionOk, setSessionOk] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  function showToast(message: string, type: ToastType = "info") {
    setToast({ message, type });
  }

  // ----------------------------
  // VALIDAR LINK DE RESET
  // ----------------------------
  useEffect(() => {
    const validarSessao = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          showToast(
            "Link inválido ou expirado. Gere um novo e-mail de redefinição.",
            "error"
          );
          setSessionOk(false);
          return;
        }

        setSessionOk(true);
        showToast("Digite sua nova senha.", "info");
      } catch {
        showToast("Erro ao validar link de redefinição.", "error");
        setSessionOk(false);
      }
    };

    validarSessao();
  }, [supabase]);

  // ----------------------------
  // REDEFINIR SENHA
  // ----------------------------
  const handleRedefinir = async () => {
    if (!senha || senha.length < 6) {
      showToast("A senha deve ter pelo menos 6 caracteres.", "info");
      return;
    }

    setCarregando(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: senha,
      });

      if (error) {
        if (
          error.message
            ?.toLowerCase()
            .includes("different from the old password")
        ) {
          showToast(
            "A nova senha deve ser diferente da senha anterior.",
            "info"
          );
          return;
        }
      
        showToast("Erro ao redefinir senha. Tente novamente.", "error");
        return;
      }

      showToast("Senha redefinida com sucesso!", "success");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      showToast("Erro inesperado ao redefinir senha.", "error");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <h1 className="text-2xl tracking-tight">FonteDosPlugins</h1>
        <p className="mt-1 text-sm text-white/70">
          Defina uma nova senha para sua conta.
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs text-white/70">
              Nova senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={!sessionOk}
              placeholder="mínimo 6 caracteres"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20 disabled:opacity-50"
            />
          </div>

          <button
            onClick={handleRedefinir}
            disabled={!sessionOk || carregando}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 disabled:opacity-60"
          >
            {carregando ? "Processando..." : "Redefinir senha"}
          </button>

          <p className="text-xs text-white/50 text-center">
            Após redefinir, você será redirecionado para o login.
          </p>
        </div>
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
