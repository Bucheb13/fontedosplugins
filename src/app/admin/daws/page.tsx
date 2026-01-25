"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAdmin } from "@/components/admin/admin-contexto";

type TipoManual = "video" | "texto";
/* =========================
   TIPOS
========================= */
type DawItem = {
  id: string;
  slug: string;
  nome: string;
  subtitulo: string | null;
  descricao: string | null;
  imagem_capa_url: string | null;
  r2_chave_arquivo: string | null;
  ativo: boolean;
  criado_em: string;
};

/* =========================
   HELPERS
========================= */
async function lerJsonComSeguranca(res: Response) {
  const texto = await res.text();
  try {
    return texto ? JSON.parse(texto) : {};
  } catch {
    return { erro: texto || "Resposta inválida do servidor" };
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]+/g, "-")     // troca tudo por -
    .replace(/(^-|-$)+/g, "");       // remove - do começo/fim
}


/* =========================
   PAGE
========================= */
export default function PaginaAdminDaws() {
  const { senhaAdmin, setMensagem, setAcaoHeader } = useAdmin();

  /* LISTA */
  const [itens, setItens] = useState<DawItem[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [filtro, setFiltro] = useState("");

  /* CAMPOS */
  const [nome, setNome] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [slugEditadoManualmente, setSlugEditadoManualmente] = useState(false);


  const [tipoManual, setTipoManual] = useState<TipoManual>("video");
  const [manualTexto, setManualTexto] = useState("");
  
  /* ARQUIVOS */
  const [arquivoCapa, setArquivoCapa] = useState<File | null>(null);
  const [arquivoTorrent, setArquivoTorrent] = useState<File | null>(null);
  const inputCapaRef = useRef<HTMLInputElement>(null);
  const inputTorrentRef = useRef<HTMLInputElement>(null);

  const [criando, setCriando] = useState(false);
  const [excluindo, setExcluindo] = useState<string | null>(null);

  /* =========================
     CARREGAR LISTA
  ========================== */
  async function carregar() {
    setMensagem(null);
    if (!senhaAdmin) return setMensagem("Digite a senha do admin.");

    setCarregando(true);

    const res = await fetch("/api/admin/daws/listar", {
      headers: { "x-senha-admin": senhaAdmin },
      cache: "no-store",
    });

    const json = await lerJsonComSeguranca(res);
    setCarregando(false);

    if (!res.ok) return setMensagem(json?.erro ?? "Erro ao carregar daws.");

    setItens(json.itens ?? []);
  }

  /* HEADER ACTION */
  useEffect(() => {
    setAcaoHeader({
      rotulo: "Carregar daws",
      carregando,
      aoClicar: carregar,
    });
    return () => setAcaoHeader(null);
  }, [setAcaoHeader, carregando, senhaAdmin]);

  /* =========================
     CRIAR
  ========================== */
  async function criar() {
    setMensagem(null);
    if (!senhaAdmin) return setMensagem("Digite a senha do admin.");

    const nomeOk = nome.trim();
    const slugOk = slugify(slug.trim());

    if (!nomeOk) return setMensagem("Nome obrigatório.");
    if (!slugOk) return setMensagem("Slug obrigatório.");
    if (!arquivoCapa) return setMensagem("Envie a capa.");
    if (!arquivoTorrent) return setMensagem("Envie o torrent.");
    if (tipoManual === "video" && !videoUrl.trim()) {
      return setMensagem("Informe a URL do vídeo.");
    }
    
    if (tipoManual === "texto" && !manualTexto.trim()) {
      return setMensagem("Informe o manual escrito.");
    }
    

    setCriando(true);

    const fd = new FormData();
    fd.append("nome", nomeOk);
    fd.append("slug", slugOk);
    fd.append("subtitulo", subtitulo.trim());
    fd.append("descricao", descricao.trim());
  
    fd.append("tipo_instalacao", tipoManual);

    if (tipoManual === "video") {
      fd.append("conteudo_instalacao", videoUrl.trim());
    } else {
      fd.append("conteudo_instalacao", manualTexto.trim());
    }
    
    
    fd.append("ativo", String(ativo));
    fd.append("capa", arquivoCapa);
    fd.append("torrent", arquivoTorrent);

    const res = await fetch("/api/admin/daws/criar", {
      method: "POST",
      headers: { "x-senha-admin": senhaAdmin },
      body: fd,
    });

    const json = await lerJsonComSeguranca(res);
    setCriando(false);

    if (!res.ok) return setMensagem(json?.erro ?? "Erro ao criar daw.");

    if (json.daw) setItens((prev) => [json.daw, ...prev]);

    setNome("");
    setSlug("");
    setSubtitulo("");
    setDescricao("");
    setVideoUrl("");
    setArquivoCapa(null);
    setArquivoTorrent(null);
    setMensagem("Daw criada com sucesso.");
  }

  /* =========================
     EXCLUIR
  ========================== */
  async function excluir(slugDaw: string) {
    if (!senhaAdmin) return;
    const ok = confirm(`Excluir "${slugDaw}"?`);
    if (!ok) return;

    setExcluindo(slugDaw);

    const res = await fetch("/api/admin/daws/deletar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-senha-admin": senhaAdmin,
      },
      body: JSON.stringify({ slug: slugDaw }),
    });

    const json = await lerJsonComSeguranca(res);
    setExcluindo(null);

    if (!res.ok) return setMensagem(json?.erro ?? "Erro ao excluir.");

    setItens((prev) => prev.filter((p) => p.slug !== slugDaw));
    setMensagem("Daw excluído.");
  }

  /* =========================
     FILTRO
  ========================== */
  const itensFiltrados = useMemo(() => {
    const f = filtro.toLowerCase();
    return itens.filter((p) =>
      `${p.nome} ${p.slug}`.toLowerCase().includes(f)
    );
  }, [itens, filtro]);

  /* =========================
     RENDER
  ========================== */
  return (
    <div className="flex flex-col gap-6">
      {/* CRIAR */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">Criar daw</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input
  placeholder="Nome"
  value={nome}
  onChange={(e) => {
    const valor = e.target.value;
    setNome(valor);

    if (!slugEditadoManualmente) {
      setSlug(slugify(valor));
    }
  }}
  className="rounded-2xl bg-black/30 px-4 py-3"
/>


<input
  placeholder="Slug"
  value={slug}
  onChange={(e) => {
    setSlugEditadoManualmente(true);
    setSlug(slugify(e.target.value));
  }}
  className="rounded-2xl bg-black/30 px-4 py-3"
/>


          <textarea
            placeholder="Subtítulo"
            value={subtitulo}
            onChange={(e) => setSubtitulo(e.target.value)}
            className="md:col-span-2 rounded-2xl bg-black/30 px-4 py-3"
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            className="md:col-span-2 rounded-2xl bg-black/30 px-4 py-3"
          />
<div className="md:col-span-2 flex gap-4">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="tipoManual"
      value="video"
      checked={tipoManual === "video"}
      onChange={() => setTipoManual("video")}
    />
    Vídeo do YouTube
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="tipoManual"
      value="texto"
      checked={tipoManual === "texto"}
      onChange={() => setTipoManual("texto")}
    />
    Manual escrito
  </label>
</div>

{tipoManual === "video" && (
  <input
    placeholder="URL do vídeo do YouTube"
    value={videoUrl}
    onChange={(e) => setVideoUrl(e.target.value)}
    className="md:col-span-2 rounded-2xl bg-black/30 px-4 py-3"
  />
)}

{tipoManual === "texto" && (
  <textarea
    placeholder="Manual de instalação (texto)"
    value={manualTexto}
    onChange={(e) => setManualTexto(e.target.value)}
    rows={6}
    className="md:col-span-2 rounded-2xl bg-black/30 px-4 py-3"
  />
)}


          {/* CAPA */}
          <button
            type="button"
            onClick={() => inputCapaRef.current?.click()}
            className="rounded-2xl bg-black/30 px-4 py-3 text-left"
          >
            {arquivoCapa ? `✅ ${arquivoCapa.name}` : "Selecionar capa (1200x547)"}
          </button>
          <input ref={inputCapaRef} type="file" hidden accept="image/*" onChange={(e) => setArquivoCapa(e.target.files?.[0] ?? null)} />

          {/* TORRENT */}
          <button
            type="button"
            onClick={() => inputTorrentRef.current?.click()}
            className="rounded-2xl bg-black/30 px-4 py-3 text-left"
          >
            {arquivoTorrent ? `✅ ${arquivoTorrent.name}` : "Selecionar torrent"}
          </button>
          <input ref={inputTorrentRef} type="file" hidden accept=".torrent" onChange={(e) => setArquivoTorrent(e.target.files?.[0] ?? null)} />

          <div className="md:col-span-2 flex justify-between items-center">
            <label className="flex gap-2 items-center">
              <input type="checkbox" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
              Ativo
            </label>

            <button
              onClick={criar}
              disabled={criando}
              className="rounded-2xl bg-white px-6 py-3 text-black font-semibold"
            >
              {criando ? "Criando…" : "Criar daw"}
            </button>
          </div>
        </div>
      </section>

      {/* LISTA */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold mb-4">DAWs cadastradas</h3>

        <input
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="mb-4 w-full rounded-2xl bg-black/30 px-4 py-3"
        />

        <div className="space-y-3">
          {itensFiltrados.map((p) => (
            <div key={p.id} className="flex justify-between items-center rounded-2xl bg-black/20 p-4">
              <div>
                <div className="font-semibold">{p.nome}</div>
                <div className="text-xs text-white/60">{p.slug}</div>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/daws/${p.slug}`} className="px-4 py-2 text-xs rounded-xl bg-black/30">
                  Editar
                </Link>
                <button
                  onClick={() => excluir(p.slug)}
                  disabled={excluindo === p.slug}
                  className="px-4 py-2 text-xs rounded-xl bg-black/30"
                >
                  {excluindo === p.slug ? "Excluindo…" : "Excluir"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
