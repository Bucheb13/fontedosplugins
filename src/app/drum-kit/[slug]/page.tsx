"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { criarSupabaseNavegador } from "@/lib/supabase-navegador";
import { BotaoDownloadUnico } from "@/components/BotaoDownloadUnico";

type DrumKit = {
  id: string;
  slug: string;
  nome: string;
  subtitulo: string | null;
  imagem_capa_url: string | null;
  descricao: string | null;
  tipo_instalacao: "video" | "texto";
  conteudo_instalacao: string | null;
  ativo: boolean;
};

type Aba = "descricao" | "instalacao" | "relacionados";

function youtubeToEmbed(url: string) {
  try {
    const u = new URL(url);

    // youtu.be/ID
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }

    // youtube.com/watch?v=ID
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}


export default function DrumKitPage() {
  useMemo(() => criarSupabaseNavegador(), []);
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const [drumKit, setDrumKit] = useState<DrumKit | null>(null);
  const [drumKitsRelacionados, setDrumKitsRelacionados] = useState<DrumKit[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<Aba>("descricao");

  /* =========================
     CARREGAR DRUMKIT
  ========================== */
  useEffect(() => {
    if (!slug) return;

    (async () => {
      setCarregando(true);
      setMensagem(null);

      const res = await fetch(
        `/api/drum-kit?slug=${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setDrumKit(null);
        setMensagem("DrumKit não encontrado.");
        setCarregando(false);
        return;
      }

      const json = (await res.json()) as { drumKit: DrumKit };
      setDrumKit(json.drumKit);
      setCarregando(false);
    })();
  }, [slug]);

  /* =========================
     RELACIONADOS
  ========================== */
  useEffect(() => {
    if (!drumKit) return;

    (async () => {
      const res = await fetch(
        `/api/drum-kit?limit=6&exclude=${drumKit.slug}`,
        { cache: "no-store" }
      );

      if (!res.ok) return;

      const json = (await res.json()) as { drumKits: DrumKit[] };
      setDrumKitsRelacionados(json.drumKits ?? []);
    })();
  }, [drumKit]);

  if (carregando)
    return <div className="text-white/70">Carregando drumKit…</div>;

  if (!drumKit)
    return (
      <div className="text-white/70">
        {mensagem ?? "DrumKit não encontrado."}
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      {/* HERO */}
      {/* HERO — IMAGEM 100% VISÍVEL */}
<section className="relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
  {/* IMAGEM */}
  <div className="w-full bg-black/40">
    {drumKit.imagem_capa_url ? (
      <img
        src={drumKit.imagem_capa_url}
        alt={drumKit.nome}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    ) : (
      <div className="aspect-[2/1] bg-gradient-to-br from-white/10 to-black/40" />
    )}
  </div>

  {/* OVERLAY */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

  {/* TEXTO */}
  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
    <h1 className="text-3xl md:text-5xl font-semibold">
      {drumKit.nome}
    </h1>

    {drumKit.subtitulo && (
      <p className="mt-3 max-w-3xl text-white/80">
        {drumKit.subtitulo}
      </p>
    )}
  </div>
</section>


      {/* DOWNLOAD */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-white/60">Download</div>
            <div className="text-lg">Baixe com 1 clique</div>
            <div className="text-sm text-white/60">
              Assinante: imediato • Não assinante: libera em 15 min
            </div>
          </div>

          <div className="w-full md:w-[360px]">
            <BotaoDownloadUnico slug={drumKit.slug} tipo="drum-kit" />
          </div>
        </div>
      </section>

      {/* ABAS */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="mb-6 flex gap-2 border-b border-white/10">
          {[
            ["descricao", "Descrição"],
            ["instalacao", "Instalação"],
            ["relacionados", "Você pode gostar também"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setAbaAtiva(key as Aba)}
              className={`px-4 pb-3 text-sm font-medium transition ${
                abaAtiva === key
                  ? "border-b-2 border-white text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* DESCRIÇÃO */}
        {abaAtiva === "descricao" && (
          <div className="text-white/80 whitespace-pre-line">
            {drumKit.descricao || (
              <p className="text-white/50">
                Este drumKit ainda não possui descrição.
              </p>
            )}
          </div>
        )}

        {/* INSTALAÇÃO */}
        {abaAtiva === "instalacao" && (
          <div>
            {drumKit.tipo_instalacao === "video" ? (
              drumKit.conteudo_instalacao ? (
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
{(() => {
  const embedUrl = youtubeToEmbed(drumKit.conteudo_instalacao);

  return embedUrl ? (
    <iframe
      src={embedUrl}
      title={`Instalação - ${drumKit.nome}`}
      className="absolute inset-0 h-full w-full"
      allowFullScreen
    />
  ) : (
    <p className="text-white/50">
      Vídeo de instalação inválido.
    </p>
  );
})()}

                </div>
              ) : (
                <p className="text-white/50">
                  Este drumKit ainda não possui vídeo de instalação.
                </p>
              )
            ) : drumKit.conteudo_instalacao ? (
              <div className="whitespace-pre-line text-white/80">
                {drumKit.conteudo_instalacao}
              </div>
            ) : (
              <p className="text-white/50">
                Nenhuma instrução de instalação disponível.
              </p>
            )}
          </div>
        )}

        {/* RELACIONADOS */}
        {abaAtiva === "relacionados" && (
          <div>
            {drumKitsRelacionados.length === 0 ? (
              <p className="text-white/50">
                Nenhuma sugestão disponível no momento.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {drumKitsRelacionados.map((p) => (
                  <Link
                    key={p.id}
                    href={`/drum-kit/${p.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      {p.imagem_capa_url ? (
                        <img
                          src={p.imagem_capa_url}
                          alt={p.nome}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/10" />
                      )}
                    </div>

                    <div className="p-4">
                      <div className="font-medium">{p.nome}</div>
                      {p.subtitulo && (
                        <div className="mt-1 text-sm text-white/60 line-clamp-2">
                          {p.subtitulo}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
