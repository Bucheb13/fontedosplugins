"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type AcaoHeader = {
  rotulo: string;
  carregando: boolean;
  aoClicar: () => void | Promise<void>;
} | null;

type AdminContextoValor = {
  senhaAdmin: string;
  setSenhaAdmin: (v: string) => void;

  mensagem: string | null;
  setMensagem: (v: string | null) => void;

  acaoHeader: AcaoHeader;
  setAcaoHeader: (a: AcaoHeader) => void;
};

const AdminContexto = createContext<AdminContextoValor | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [senhaAdmin, setSenhaAdmin] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [acaoHeader, setAcaoHeader] = useState<AcaoHeader>(null);

  const valor = useMemo(
    () => ({ senhaAdmin, setSenhaAdmin, mensagem, setMensagem, acaoHeader, setAcaoHeader }),
    [senhaAdmin, mensagem, acaoHeader]
  );

  return <AdminContexto.Provider value={valor}>{children}</AdminContexto.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContexto);
  if (!ctx) throw new Error("useAdmin precisa estar dentro de <AdminProvider />");
  return ctx;
}
