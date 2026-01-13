import Link from "next/link";

type ItemBasico = {
  id: string;
  slug: string;
  nome: string;
  subtitulo: string | null;
  imagem_capa_url: string | null;
};

export function CardCatalogo({
  item,
  hrefBase,
  etiqueta,
}: {
  item: ItemBasico;
  hrefBase: string;
  etiqueta: string;
}) {
  return (
    <Link
      href={`${hrefBase}/${item.slug}`}
      className={[
        "group relative rounded-3xl",
        "border border-white/10 bg-white/5",
        "backdrop-blur-md",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1.5 hover:scale-[1.015]",
        "hover:border-white/30 hover:bg-white/10",
        "hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]",
      ].join(" ")}
    >
     {/* CAPA — BORDA PERFEITA, SEM CROP */}
<div className="w-full rounded-t-3xl overflow-hidden bg-black/40">
  {item.imagem_capa_url ? (
    <img
      src={item.imagem_capa_url}
      alt={item.nome}
      loading="lazy"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
    />
  ) : (
    <div className="aspect-[2/1] flex items-center justify-center text-sm text-white/40">
      Sem capa
    </div>
  )}
</div>


      {/* ETIQUETA */}
      <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
        {etiqueta}
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 flex flex-col p-5">
        <div className="text-sm leading-tight tracking-tight text-white">
          {item.nome}
        </div>

        <div className="mt-2 line-clamp-2 text-xs text-white/65">
          {item.subtitulo?.trim() ? item.subtitulo : "Sem descrição."}
        </div>

        <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-white/90">
          Ver detalhes
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </div>
      </div>

      {/* BORDA INTERNA */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
    </Link>
  );
}
