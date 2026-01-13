"use client";

import { useState } from "react";
import { criarSupabaseNavegador } from "@/lib/supabase-navegador";
import { useRouter } from "next/navigation";

type ModalRedefinirSenhaProps = {
  aberto: boolean;
  onFechar: () => void;
};

export function ModalRedefinirSenha({ aberto, onFechar }: ModalRedefinirSenhaProps) {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (!aberto) return null;

  const handleRedefinirSenha = async () => {
    setErro("");

    if (!senha || !confirmarSenha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    setLoading(true);
    const supabase = criarSupabaseNavegador();

    const { error } = await supabase.auth.updateUser({ password: senha });
    setLoading(false);

    if (error) {
      setErro(error.message);
      return;
    }

    // Fecha modal e redireciona para home
    onFechar();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-black/90 p-6 text-white shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Redefinir senha</h2>

        {erro && <p className="mb-3 text-red-400">{erro}</p>}

        <input
          type="password"
          placeholder="Nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mb-3 w-full rounded-lg border border-white/20 bg-black/80 px-4 py-2 text-white outline-none"
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="mb-3 w-full rounded-lg border border-white/20 bg-black/80 px-4 py-2 text-white outline-none"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onFechar}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleRedefinirSenha}
            disabled={loading}
            className="rounded-lg bg-purple-500 px-4 py-2 text-sm text-white hover:bg-purple-600 transition"
          >
            {loading ? "Redefinindo..." : "Redefinir"}
          </button>
        </div>
      </div>
    </div>
  );
}
