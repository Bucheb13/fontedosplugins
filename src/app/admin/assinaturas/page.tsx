"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/components/admin/admin-contexto";

type Assinatura = {
  id: string;
  usuario_id: string;
  display_name: string | null;
  status: "ativa" | "inativa";
  tipo: "mensal" | "anual" | null;
  periodo_fim: string | null;
  criado_em: string;
};

function formatarData(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

async function lerJsonComSeguranca(res: Response) {
  const texto = await res.text();
  try {
    return texto ? JSON.parse(texto) : {};
  } catch {
    return { erro: texto || "Resposta inválida do servidor" };
  }
}

export default function PaginaAdminAssinaturas() {
  const { senhaAdmin, setMensagem, setAcaoHeader } = useAdmin();

  const [itens, setItens] = useState<Assinatura[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [atualizandoId, setAtualizandoId] = useState<string | null>(null);
  const [redefinindoId, setRedefinindoId] = useState<string | null>(null);

  // States para criação
  const [novoUsuarioId, setNovoUsuarioId] = useState("");
  const [novoTipo, setNovoTipo] = useState<"mensal" | "anual">("mensal");
  const [novoStatus, setNovoStatus] = useState<"ativa" | "inativa">("ativa");
  const [criando, setCriando] = useState(false);
  const [usuariosDisponiveis, setUsuariosDisponiveis] = useState<
    { id: string; display_name: string | null }[]
  >([]);

  // Carregar assinaturas
  const carregar = useCallback(async () => {
    setMensagem(null);
    if (!senhaAdmin) {
      setMensagem("Digite a senha do admin.");
      return;
    }

    setCarregando(true);
    const res = await fetch("/api/admin/assinaturas/listar", {
      headers: { "x-senha-admin": senhaAdmin },
      cache: "no-store",
    });

    const json = await lerJsonComSeguranca(res);
    setCarregando(false);

    if (!res.ok) {
      setMensagem(json?.erro ?? "Falha ao carregar assinaturas.");
      return;
    }

    setItens((json.itens ?? []) as Assinatura[]);
  }, [senhaAdmin, setMensagem]);

  useEffect(() => {
    setAcaoHeader({
      rotulo: "Carregar lista",
      carregando,
      aoClicar: carregar,
    });
    return () => setAcaoHeader(null);
  }, [setAcaoHeader, carregando, carregar]);

  // Carregar usuários disponíveis
  useEffect(() => {
    if (!senhaAdmin) {
      // evita render cascades
      Promise.resolve().then(() => setUsuariosDisponiveis([]));
      return;
    }

    const carregarUsuariosDisponiveis = async () => {
      try {
        const res = await fetch(
          "/api/admin/assinaturas/listar?todosUsuarios=true",
          { headers: { "x-senha-admin": senhaAdmin }, cache: "no-store" }
        );

        const json = await lerJsonComSeguranca(res);
        if (!res.ok) {
          setMensagem(json?.erro ?? "Falha ao carregar usuários.");
          setUsuariosDisponiveis([]);
          return;
        }

        const todosUsuarios: { id: string; display_name: string | null }[] =
          json.usuariosDisponiveis ?? [];

        // Filtra apenas usuários que ainda não têm assinatura
        const idsComAssinatura = new Set(itens.map((a) => a.usuario_id));
        const disponiveis = todosUsuarios.filter(
          (u) => !idsComAssinatura.has(u.id)
        );

        setUsuariosDisponiveis(disponiveis);
      } catch (err) {
        console.error(err);
        setUsuariosDisponiveis([]);
      }
    };

    void carregarUsuariosDisponiveis();
  }, [senhaAdmin, itens, setMensagem]);

  // Criar assinatura
  const criarAssinatura = useCallback(async () => {
    if (!senhaAdmin) return setMensagem("Digite a senha do admin.");
    if (!novoUsuarioId) return setMensagem("Selecione um usuário.");

    if (itens.find((i) => i.usuario_id === novoUsuarioId)) {
      return setMensagem("Usuário já possui assinatura.");
    }

    setCriando(true);

    let periodo_fim: string | null = null;
    if (novoStatus === "ativa") {
      const data = new Date();
      data.setDate(data.getDate() + (novoTipo === "mensal" ? 31 : 365));
      periodo_fim = data.toISOString();
    }

    const res = await fetch("/api/admin/assinaturas/atualizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-senha-admin": senhaAdmin,
      },
      body: JSON.stringify({
        usuarioId: novoUsuarioId,
        status: novoStatus,
        tipo: novoStatus === "ativa" ? novoTipo : null,
        periodo_fim,
      }),
    });

    const json = await lerJsonComSeguranca(res);
    setCriando(false);

    if (!res.ok) return setMensagem(json?.erro ?? "Falha ao criar assinatura.");

    const usuarioSelecionado = usuariosDisponiveis.find(
      (u) => u.id === novoUsuarioId
    );

    setItens((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        usuario_id: novoUsuarioId,
        display_name: usuarioSelecionado?.display_name ?? null,
        status: novoStatus,
        tipo: novoStatus === "ativa" ? novoTipo : null,
        periodo_fim,
        criado_em: new Date().toISOString(),
      },
    ]);

    setMensagem("Assinatura criada com sucesso.");
    setNovoUsuarioId("");
    setNovoTipo("mensal");
    setNovoStatus("ativa");

    // Remove usuário do dropdown
    setUsuariosDisponiveis((prev) =>
      prev.filter((u) => u.id !== novoUsuarioId)
    );
  }, [
    senhaAdmin,
    novoUsuarioId,
    novoTipo,
    novoStatus,
    itens,
    setMensagem,
    usuariosDisponiveis,
  ]);

  // Atualizar assinatura
  const atualizar = useCallback(
    async (
      usuarioId: string,
      patch: { status?: Assinatura["status"]; tipo?: "mensal" | "anual" | null }
    ) => {
      setMensagem(null);
      if (!senhaAdmin) return setMensagem("Digite a senha do admin.");

      setAtualizandoId(usuarioId);

      const itemAtual = itens.find((a) => a.usuario_id === usuarioId);
      if (!itemAtual) return;

      const novoStatus = patch.status ?? itemAtual.status;
      let novoTipo = patch.tipo ?? itemAtual.tipo;
      let novoPeriodoFim: string | null = itemAtual.periodo_fim;

      if (novoStatus === "inativa") {
        novoTipo = null;
        novoPeriodoFim = null;
      } else if (novoStatus === "ativa") {
        const data = new Date();
        data.setDate(data.getDate() + (novoTipo === "mensal" ? 31 : 365));
        novoPeriodoFim = data.toISOString();
      }

      const res = await fetch("/api/admin/assinaturas/atualizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-senha-admin": senhaAdmin,
        },
        body: JSON.stringify({
          usuarioId,
          status: novoStatus,
          tipo: novoTipo,
          periodo_fim: novoPeriodoFim,
        }),
      });

      const json = await lerJsonComSeguranca(res);
      setAtualizandoId(null);

      if (!res.ok) {
        setMensagem(json?.erro ?? "Falha ao atualizar assinatura.");
        return;
      }

      setItens((prev) =>
        prev.map((a) =>
          a.usuario_id === usuarioId
            ? { ...a, status: novoStatus, tipo: novoTipo, periodo_fim: novoPeriodoFim }
            : a
        )
      );

      setMensagem("Assinatura atualizada.");
    },
    [senhaAdmin, setMensagem, itens]
  );

  // Redefinir senha
  const redefinirSenha = useCallback(
    async (usuarioId: string) => {
      setMensagem(null);
      if (!senhaAdmin) return setMensagem("Digite a senha do admin.");

      setRedefinindoId(usuarioId);

      const res = await fetch("/api/admin/assinaturas/redefinir-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-senha-admin": senhaAdmin,
        },
        body: JSON.stringify({ usuarioId }),
      });

      const json = await lerJsonComSeguranca(res);
      setRedefinindoId(null);

      if (!res.ok) {
        setMensagem(json?.erro ?? "Falha ao enviar redefinição de senha.");
        return;
      }

      setMensagem("Email de redefinição de senha enviado.");
    },
    [senhaAdmin, setMensagem]
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Gerenciamento de assinaturas</h2>
            <p className="mt-1 text-sm text-white/70">
              Controle manual do status e tipo por usuário.
            </p>
          </div>
          <div className="text-xs text-white/60">{itens.length} itens</div>
        </div>

        {/* FORMULÁRIO DE CRIAÇÃO */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 flex flex-col gap-2">
          <h3 className="font-semibold">Criar nova assinatura</h3>

          <select
            value={novoUsuarioId}
            onChange={(e) => setNovoUsuarioId(e.target.value)}
            disabled={!senhaAdmin || usuariosDisponiveis.length === 0}
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none"
          >
            <option value="">
              {usuariosDisponiveis.length === 0
                ? "Nenhum usuário disponível"
                : "Selecione um usuário"}
            </option>
            {usuariosDisponiveis.map((u) => (
              <option key={u.id} value={u.id}>
                {u.display_name ? `${u.display_name} (${u.id})` : u.id}
              </option>
            ))}
          </select>

          <div className="flex gap-2 mt-2">
            <select
              value={novoTipo}
              onChange={(e) => setNovoTipo(e.target.value as "mensal" | "anual")}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none"
            >
              <option value="mensal">mensal</option>
              <option value="anual">anual</option>
            </select>

            <select
              value={novoStatus}
              onChange={(e) =>
                setNovoStatus(e.target.value as "ativa" | "inativa")
              }
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none"
            >
              <option value="ativa">ativa</option>
              <option value="inativa">inativa</option>
            </select>

            <button
              disabled={criando || !novoUsuarioId}
              onClick={criarAssinatura}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none hover:bg-black/40"
            >
              {criando ? "Criando…" : "Criar"}
            </button>
          </div>
        </div>

        {/* LISTA EXISTENTE */}
        {itens.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-white/70">
            Nenhuma assinatura carregada ainda. Digite a senha no header e clique em{" "}
            <b>Carregar lista</b>.
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {itens.map((a) => {
              const bloqueado =
                !senhaAdmin ||
                atualizandoId === a.usuario_id ||
                redefinindoId === a.usuario_id;

              return (
                <div
                  key={a.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">
                      Usuário:{" "}
                      <span className="text-white/90">{a.display_name || "Sem nome"}</span>
                    </div>

                    <div className="mt-1 grid gap-1 text-xs text-white/60">
                      <div>ID: {a.usuario_id}</div>
                      <div>Criado: {formatarData(a.criado_em)}</div>
                      <div>
                        Período fim: {a.periodo_fim ? formatarData(a.periodo_fim) : "sem data"}
                      </div>
                      <div>Tipo atual: {a.status === "ativa" ? a.tipo ?? "não definido" : "—"}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {a.status === "ativa" && (
                      <select
                        value={a.tipo ?? ""}
                        disabled={bloqueado}
                        onChange={(e) =>
                          void atualizar(a.usuario_id, {
                            tipo: (e.target.value || null) as "mensal" | "anual" | null,
                          })
                        }
                        className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none disabled:opacity-60"
                      >
                        <option value="mensal">mensal</option>
                        <option value="anual">anual</option>
                      </select>
                    )}

                    <select
                      value={a.status}
                      disabled={bloqueado}
                      onChange={(e) =>
                        void atualizar(a.usuario_id, {
                          status: e.target.value as Assinatura["status"],
                        })
                      }
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none disabled:opacity-60"
                    >
                      <option value="ativa">ativa</option>
                      <option value="inativa">inativa</option>
                    </select>

                    <button
                      disabled={bloqueado}
                      onClick={() => void redefinirSenha(a.usuario_id)}
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none disabled:opacity-60 hover:bg-black/40"
                    >
                      {redefinindoId === a.usuario_id ? "Enviando…" : "Redefinir senha"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
