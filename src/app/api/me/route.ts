import { NextResponse } from "next/server";
import { criarSupabaseServidor } from "@/lib/supabase-servidor";

export async function GET() {
  const supabase = await criarSupabaseServidor();
  const { data } = await supabase.auth.getUser();

  return NextResponse.json({
    logado: !!data.user,
    id: data.user?.id ?? null,
    email: data.user?.email ?? null,
    nome: (data.user?.user_metadata?.display_name as string | undefined) ?? null,
  });
}