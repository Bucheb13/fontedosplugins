"use client";

import { useMemo, useState } from "react";
import { CardCatalogo } from "@/components/CardCatalogo";

type Categoria = "todos" | "plugin" | "daw" | "drumkit" | "programa";

type Ordem = "recentes" | "az";

export type ItemVitrine = {
    id: string;
    slug: string;
    nome: string;
    subtitulo: string | null;
    imagem_capa_url: string | null;
    categoria: Exclude<Categoria, "todos">;
    etiqueta: string;
    hrefBase: string;
  };
  

function normalizar(s: string) {
  return (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* =========================
   CHIP – IDENTIDADE
========================= */
function Chip({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative rounded-full px-4 py-2 text-sm transition-all duration-300",
        "border backdrop-blur-md",
        ativo
          ? "border-white/40 bg-white text-black shadow-[0_8px_30px_rgba(255,255,255,0.15)] scale-[1.03]"
          : "border-white/15 bg-black/30 text-white/70 hover:bg-black/40 hover:scale-[1.03]",
      ].join(" ")}
      
    >
      {children}
    </button>
  );
}

/* =========================
   SELECT ORDEM
========================= */
function OrdemSelect({
  value,
  onChange,
}: {
  value: Ordem;
  onChange: (v: Ordem) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Ordem)}
      className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white/90 outline-none backdrop-blur-md"
    >
      <option value="recentes">Mais recentes</option>
      <option value="az">A → Z</option>
    </select>
  );
}

/* =========================
   VITRINE HOME – IDENTIDADE FDP
========================= */
/* =========================
   VITRINE HOME – COM CARREGAR MAIS
========================= */
export function VitrineHome({
  itens,
  contagens,
}: {
  itens: ItemVitrine[];
  contagens: {
    plugins: number;
    daws: number;
    drumKits: number;
    programas: number;
  };
}) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("todos");
  const [ordem, setOrdem] = useState<Ordem>("recentes");
  const [limit, setLimit] = useState(6); // quantidade inicial de itens mostrados

  const filtrados = useMemo(() => {
    const q = normalizar(busca.trim());
    let base = itens;

    if (categoria !== "todos") {
      base = base.filter((i) => i.categoria === categoria);
    }

    if (q) {
      base = base.filter((i) => {
        const alvo = normalizar(`${i.nome} ${i.slug} ${i.subtitulo ?? ""}`);
        return alvo.includes(q);
      });
    }

    if (ordem === "az") {
      base = [...base].sort((a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR")
      );
    }

    return base;
  }, [itens, busca, categoria, ordem]);

  // itens visíveis até o momento
  const visiveis = filtrados.slice(0, limit);

  const podeCarregarMais = visiveis.length < filtrados.length;

  return (
    <section className="relative overflow-hidden rounded-[32px] px-6 py-10 md:px-10 md:py-14">
      {/* FUNDO BASE */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/imagens/banner-destaque.png')" }}
      />
      {/* OVERLAY IDENTIDADE */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />
      {/* GLOW SUAVE CENTRAL */}
      <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />
      {/* CONTEÚDO */}
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Tudo que você precisa para <span className="text-white/80">produzir músicas com qualidade!</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
            Plugins, DAWs e ferramentas premium em um só lugar.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-[340px]">
            <label className="text-xs text-white/60">Buscar</label>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquise..."
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none backdrop-blur-md placeholder:text-white/30"
            />
          </div>
        </div>
      </div>

      {/* CHIPS */}
      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        <Chip ativo={categoria === "todos"} onClick={() => setCategoria("todos")}>Todos</Chip>
        <Chip ativo={categoria === "plugin"} onClick={() => setCategoria("plugin")}>Plugins</Chip>
        <Chip ativo={categoria === "daw"} onClick={() => setCategoria("daw")}>DAWs</Chip>
        <Chip ativo={categoria === "drumkit"} onClick={() => setCategoria("drumkit")}>Drum Kits</Chip>
        <Chip ativo={categoria === "programa"} onClick={() => setCategoria("programa")}>Programas</Chip>

        {(busca.trim() || categoria !== "todos") && (
          <button
            type="button"
            onClick={() => {
              setBusca("");
              setCategoria("todos");
              setOrdem("recentes");
              setLimit(6); // resetar limite ao limpar filtros
            }}
            className="ml-auto rounded-2xl border border-white/15 bg-black/30 px-4 py-2 text-sm text-white/70 backdrop-blur-md hover:bg-black/40"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* RESULTADOS */}
      <div className="relative z-10 mt-6">
        {visiveis.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/70 backdrop-blur-md">
            Nada encontrado com os filtros atuais.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in zoom-in-95 duration-500">
              {visiveis.map((item) => (
                <CardCatalogo
                  key={`${item.categoria}-${item.id}`}
                  item={item}
                  hrefBase={item.hrefBase}
                  etiqueta={item.etiqueta}
                />
              ))}
            </div>

            {podeCarregarMais && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLimit((prev) => prev + 6)}
                  className="rounded-2xl border border-white/15 bg-black/40 px-6 py-3 text-sm text-white/90 backdrop-blur-md hover:bg-black/50 transition"
                >
                  Carregar mais
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
