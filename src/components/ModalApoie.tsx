"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { criarSupabaseNavegador } from "@/lib/supabase-navegador";
import type { User } from "@supabase/supabase-js";

type ModalProps = {
  onClose: () => void;
};

export default function ModalApoie({ onClose }: ModalProps) {
  const router = useRouter();
  const supabase = criarSupabaseNavegador();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const handleButtonClick = () => {
    if (!user) router.push("/login?retorno=/assinaturas");
    else router.push("/assinaturas");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl px-4">
      
      {/* WRAPPER */}
      <div className="relative">

        {/* BOTÃO FECHAR — FORA DO MODAL */}
        <button
          onClick={onClose}
          className="
            absolute -top-5 -right-5
            w-11 h-11
            rounded-full
            bg-black
            text-white text-xl
            flex items-center justify-center
            border border-cyan-400
            shadow-[0_0_20px_#0ff]
            hover:text-red-500
            transition
            z-50
          "
        >
          ✕
        </button>

        {/* MODAL */}
        <div className="
          w-full max-w-lg
          bg-[#0a0a0a]
          border-2 border-cyan-500
          rounded-2xl
          p-5
          shadow-[0_0_120px_#00f6ff]
          animate-modal-pro
        ">

          {/* IMAGEM */}
          <div className="
            w-full aspect-[16/9]
            mb-5
            overflow-hidden
            rounded-xl
            border border-cyan-400/40
            shadow-[0_0_35px_#00f6ff]
          ">
            <img
              src="/imagens/modal-apoie.png"
              alt="Apoie o projeto"
              className="
                w-full h-full
                object-cover
                scale-[1.05]
                hover:scale-[1.1]
                transition-transform duration-500
                modal-image-neon
              "
            />
          </div>

          {/* TÍTULO */}
          <h2 className="
            text-3xl md:text-4xl
            font-extrabold
            text-cyan-400
            mb-3
            text-center
            tracking-wide
            drop-shadow-[0_0_18px_#00f6ff]
          ">
            Apoie o projeto
          </h2>

          {/* TEXTO */}
          <p className="
            text-base md:text-lg
            text-white/90
            text-center
            mb-6
            leading-relaxed
          ">
            Seu apoio mantém o site ativo e libera mais plugins,
            conteúdos exclusivos e atualizações constantes.
          </p>

          {/* CTA */}
          <button
            onClick={handleButtonClick}
            className="
              w-full py-4
              text-lg font-extrabold
              text-black
              rounded-xl
              bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-800
              border-2 border-cyan-300
              neon-cta
              transition
            "
          >
            Apoiar / Assinar agora
          </button>

        </div>
      </div>
    </div>
  );
}
