"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Daw = {
  id: string;
  slug: string;
  nome: string;
  subtitulo: string | null;
  imagem_capa_url: string | null;
};

export default function PaginaDaw() {
  const [daws, setDaws] = useState<Daw[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  // Debounce simples para pesquisa
  const [debouncedPesquisa, setDebouncedPesquisa] = useState(pesquisa);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedPesquisa(pesquisa), 500);
    return () => clearTimeout(t);
  }, [pesquisa]);

  const buscarDaws = async (query: string) => {
    setCarregando(true);
    setErro("");
    try {
      const url = new URL("/api/daws", location.origin);
      if (query) url.searchParams.set("q", query);

      const res = await fetch(url.toString());
      const data = await res.json();

      if (data.erro) {
        setErro(data.erro);
        setDaws([]);
      } else {
        setDaws(data.daws ?? []);
      }
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar DAWs");
      setDaws([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDaws(debouncedPesquisa);
  }, [debouncedPesquisa]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-2 flex flex-col items-center">
      {/* CABEÇALHO */}
      <header className="text-center mb-6 w-full max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          DAWs
        </h1>
        <p className="mt-3 text-white/70 text-lg md:text-xl">
        Apoie o site para liberar o download imediatamente!
        </p>

        <input
          type="text"
          placeholder="Busque por DAWs..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="mt-6 w-full rounded-xl bg-black/30 border border-cyan-400 p-4 text-white placeholder:text-white/50 shadow-md focus:ring-2 focus:ring-cyan-400 transition"
        />
      </header>

      {/* MENSAGENS */}
      {carregando && <p className="text-white/70 mb-4">Carregando DAWs...</p>}
      {erro && <p className="text-red-400 mb-4">{erro}</p>}

      {/* GRID DE DAWs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full justify-items-center">
        {daws.length === 0 && !carregando && (
          <div className="col-span-full text-white/60 text-center py-10">
            Nenhuma DAW encontrada.
          </div>
        )}

        {daws.map((daw) => (
          <Link
            key={daw.id}
            href={`/daws/${daw.slug}`}
            className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02] hover:border-cyan-400 hover:bg-white/10"
          >
            {/* IMAGEM */}
            <div className="relative h-56 w-full overflow-hidden rounded-t-3xl bg-black/40">
              {daw.imagem_capa_url ? (
                <img
                  src={daw.imagem_capa_url}
                  alt={daw.nome}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/30 text-sm">
                  Sem imagem
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* CONTEÚDO */}
            <div className="flex flex-col gap-2 p-5">
              <h2 className="text-xl leading-tight text-white">{daw.nome}</h2>
              {daw.subtitulo && (
                <p className="text-sm text-white/70 line-clamp-3">{daw.subtitulo}</p>
              )}
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-white/60 group-hover:text-white transition-all">
                Ver detalhes
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
