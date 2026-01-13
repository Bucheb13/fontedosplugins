import Link from "next/link";
import { headers } from "next/headers";
import { VitrineHome } from "@/components/home/VitrineHome";
import type { ItemVitrine } from "@/components/home/VitrineHome";
import type { Metadata } from "next";
import { criarSupabaseServidor } from "@/lib/supabase-servidor";

export const metadata: Metadata = {
  title: "FonteDosPlugins — Plugins VST, DAWs e Drum Kits",
  description:
    "Baixe plugins VST, DAWs, drum kits e programas para produção musical. Grátis com espera de 15 minutos ou apoie via Pix para acesso imediato.",
};

type ItemBasico = {
  id: string;
  slug: string;
  nome: string;
  subtitulo: string | null;
  imagem_capa_url: string | null;
};

async function obterOrigin() {
  const appUrl = process.env.APP_URL;
  if (appUrl) return appUrl.replace(/\/+$/, "");

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : "";
}

async function fetchLista<T>(url: string, chave: string): Promise<T[]> {
  const res = await fetch(url, { next: { revalidate: 60 } }).catch(() => null);
  if (!res || !res.ok) return [];
  const json = (await res.json()) as Record<string, unknown>;
  return (json?.[chave] as T[]) ?? [];
}

function embaralhar<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function temAssinaturaAtiva(assinatura?: {
  status: "ativa" | "inativa";
  periodo_fim: string;
} | null) {
  if (!assinatura) return false;
  const agora = Date.now();
  const fim = new Date(assinatura.periodo_fim).getTime();
  return assinatura.status === "ativa" && fim >= agora;
}

export default async function PaginaInicial() {
  const origin = await obterOrigin();

  const [plugins, daws, drumKits, programas] = await Promise.all([
    fetchLista<ItemBasico>(`${origin}/api/plugins`, "plugins"),
    fetchLista<ItemBasico>(`${origin}/api/daws`, "daws"),
    fetchLista<ItemBasico>(`${origin}/api/drum-kit`, "drumKits"),
    fetchLista<ItemBasico>(`${origin}/api/programas`, "programas"),
  ]);

  const supabase = await criarSupabaseServidor();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const user = session?.user ?? null;
  
  let assinaturaAtiva: { status: "ativa"; periodo_fim: string } | null = null;

if (user) {
  const { data: assinatura } = await supabase
    .from("assinaturas")
    .select("status, periodo_fim")
    .eq("usuario_id", user.id)
    .maybeSingle();

  if (assinatura && assinatura.status === "ativa") {
    const fim = new Date(assinatura.periodo_fim).getTime();
    const agora = new Date().getTime(); // evita Date.now() direto no if
    if (fim >= agora) {
      assinaturaAtiva = assinatura;
    }
  }
}

  

const mostrarAssinatura = !assinaturaAtiva;

const hrefAssinatura = user
  ? "/assinaturas"
  : "/login?retorno=/assinaturas";

  const itensHome: ItemVitrine[] = [
    ...plugins.map((i): ItemVitrine => ({
      id: i.id,
      slug: i.slug,
      nome: i.nome,
      subtitulo: i.subtitulo,
      imagem_capa_url: i.imagem_capa_url,
      categoria: "plugin",
      etiqueta: "Plugin",
      hrefBase: "/plugins",
    })),
    ...daws.map((i): ItemVitrine => ({
      id: i.id,
      slug: i.slug,
      nome: i.nome,
      subtitulo: i.subtitulo,
      imagem_capa_url: i.imagem_capa_url,
      categoria: "daw",
      etiqueta: "DAW",
      hrefBase: "/daws",
    })),
    ...drumKits.map((i): ItemVitrine => ({
      id: i.id,
      slug: i.slug,
      nome: i.nome,
      subtitulo: i.subtitulo,
      imagem_capa_url: i.imagem_capa_url,
      categoria: "drumkit",
      etiqueta: "Drum-Kit",
      hrefBase: "/drum-kit",
    })),
    ...programas.map((i): ItemVitrine => ({
      id: i.id,
      slug: i.slug,
      nome: i.nome,
      subtitulo: i.subtitulo,
      imagem_capa_url: i.imagem_capa_url,
      categoria: "programa",
      etiqueta: "Programa",
      hrefBase: "/programas",
    })),
  ];

  const itensMisturados = embaralhar(itensHome);

  return (
    <div className="flex flex-col gap-10">
      {/* =========================
         HERO
      ========================= */}
      <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-8 md:p-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/imagens/banner-pesquisa.jpg')" }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-green-400/80" />
            Torrents verificados e livres de vírus
          </div>

          <h1 className="mt-6 text-3xl md:text-5xl leading-[1.15] tracking-tight">
            Plugins VST, DAWs e Drum Kits para Produção Musical
          </h1>

          <p className="mt-3 text-base md:text-lg text-white/80">
            Downloads grátis com espera de 15 minutos.
            <span className="block">
              Apoie para baixar sem precisar esperar!
            </span>
          </p>
{/* CTA ASSINATURA */}
<div className="mt-6 flex flex-wrap items-center gap-4">
  {assinaturaAtiva ? (
    <span className="text-sm text-green-400">
      Sua assinatura está ativa até:{" "}
      <strong>{new Date(assinaturaAtiva.periodo_fim).toLocaleDateString("pt-BR")}</strong>
    </span>
  ) : (
    <>
      <Link
        href={hrefAssinatura}
        className="
          relative inline-flex items-center gap-2
          rounded-full
          border border-cyan-400/40
          bg-cyan-400/10
          px-3 py-1.5
          text-sm font-semibold text-cyan-300
          backdrop-blur
          transition-all duration-300
          hover:bg-cyan-400/20
          hover:border-cyan-300/70
          hover:scale-[1.04]
          shadow-[0_0_30px_rgba(34,211,238,0.45)]
        "
      >
        Apoiar via Pix e baixar sem espera
        <span className="text-base">🚀</span>
      </Link>

      <span className="text-xs font-sans text-white/70">
        A partir de <strong>R$ 7,00/mês</strong> • Liberação imediata
      </span>
    </>
  )}
</div>




          <div className="mt-7 flex flex-wrap gap-2">
            {[
              { href: "/plugins", label: `Plugins (${plugins.length})` },
              { href: "/daws", label: `DAWs (${daws.length})` },
              { href: "/drum-kit", label: `Drum-Kits (${drumKits.length})` },
              { href: "/programas", label: `Programas (${programas.length})` },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white/80 backdrop-blur transition-all hover:bg-black/40 hover:scale-105 hover:border-white/30"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="mt-6 text-xs tracking-wide text-white/90">
            * Apoie via Pix: R$ 7,00 mensal ou R$ 22,00 anual.
          </p>
          <p className="mt-2 text-xs tracking-wide text-white/80">
            Pagamento 100% seguro via Pix • Acesso liberado automaticamente
          </p>
        </div>
      </section>

      {/* =========================
         VITRINE
      ========================= */}
      <VitrineHome
        itens={itensMisturados}
        contagens={{
          plugins: plugins.length,
          daws: daws.length,
          drumKits: drumKits.length,
          programas: programas.length,
        }}
      />

      {/* =========================
         ASSINATURA
      ========================= */}
      {mostrarAssinatura && (
  <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
    <Link
      href={hrefAssinatura}
      className="group relative block cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/25 hover:scale-[1.01] hover:brightness-110"
    >
      <img
        src="/imagens/banner-apoie.png"
        alt="Assinatura FonteDosPlugins"
        className="aspect-[16/6] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
    </Link>
  </section>
)}
    </div>
  );
}
