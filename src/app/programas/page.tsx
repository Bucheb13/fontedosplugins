import type { Metadata } from "next";
import ProgramasClient from "./ProgramasClient";

export const metadata: Metadata = {
  title: "Programas para Produção Musical | Fonte dos Plugins",
  description:
    "Baixe Programas profissionais para trap, drill, boom bap, eletrônica e mais.",
};

export default function Page() {
  return <ProgramasClient />;
}
