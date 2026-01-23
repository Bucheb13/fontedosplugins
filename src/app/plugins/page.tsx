import type { Metadata } from "next";
import PluginsClient from "./PluginsClient";

export const metadata: Metadata = {
  title: "Plugins para Produção Musical | Fonte dos Plugins",
  description:
    "Baixe Plugins profissionais para trap, drill, boom bap, eletrônica e mais.",
};

export default function Page() {
  return <PluginsClient />;
}
