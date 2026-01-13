"use client";

import { useEffect, useState } from "react";
import ModalApoie from "./ModalApoie";

type Assinatura = {
  status: "ativa" | "inativa" | null;
  periodo_fim: string | null;
};

interface Props {
  assinatura: Assinatura | null;
}

export default function ClientWrapper({ assinatura }: Props) {
  const [show, setShow] = useState(false);

  const deveMostrar = () => {
    const hoje = new Date();
    if (!assinatura) return true; // sem assinatura
    if (assinatura.status !== "ativa") return true; // assinatura inativa
    if (assinatura.periodo_fim && new Date(assinatura.periodo_fim) < hoje) return true; // expirada
    return false; // assinatura ativa e vigente
  };

  useEffect(() => {
    if (!deveMostrar()) return;

    const timer = setTimeout(() => setShow(true), 5000); // 5s após carregar
    return () => clearTimeout(timer);
  }, [assinatura]);

  useEffect(() => {
    if (!deveMostrar()) return;

    const interval = setInterval(() => setShow(true), 600000); // 10 min
    return () => clearInterval(interval);
  }, [assinatura]);

  return <>{show && <ModalApoie onClose={() => setShow(false)} />}</>;
}
