"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { criarSupabaseNavegador } from "@/lib/supabase-navegador";

type AuthLike = {
  getSessionFromUrl?: () => Promise<unknown>;
  setSession?: (payload: { access_token?: string | null; refresh_token?: string | null }) => Promise<unknown>;
  setAuth?: (token: string) => void;
};

type SessionResult = {
  data?: { session?: unknown };
  session?: unknown;
  error?: unknown;
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  useEffect(() => {
    const supabase = criarSupabaseNavegador();
    const anyAuth = supabase.auth as AuthLike;

    async function handleCallback() {
      try {
        if (typeof anyAuth.getSessionFromUrl === "function") {
          const result = (await anyAuth.getSessionFromUrl()) as SessionResult;
          const session = result?.data?.session ?? result?.session ?? null;
          if (session) {
            history.replaceState({}, "", window.location.pathname + window.location.search);
            router.replace(next);
            return;
          }
        }

        const hash = window.location.hash.startsWith("#")
          ? window.location.hash.substring(1)
          : window.location.hash;
        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token) {
          if (typeof anyAuth.setSession === "function") {
            await anyAuth.setSession({ access_token, refresh_token });
            history.replaceState({}, "", window.location.pathname + window.location.search);
            router.replace(next);
            return;
          }

          if (typeof anyAuth.setAuth === "function") {
            anyAuth.setAuth(access_token);
            history.replaceState({}, "", window.location.pathname + window.location.search);
            router.replace(next);
            return;
          }
        }

        router.replace("/login");
      } catch (err) {
        console.error("[auth-callback] erro:", err);
        router.replace("/login");
      }
    }

    handleCallback();
  }, [router, searchParams, next]);

  return <div className="p-8">Carregando autenticação...</div>;
}