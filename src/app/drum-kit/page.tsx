import type { Metadata } from "next";
import DrumKitsClient from "./DrumKitsClient";

export const metadata: Metadata = {
  title: "Drum-Kits para Produção Musical | Fonte dos Plugins",
  description:
    "Baixe Drum-Kits profissionais para trap, drill, boom bap, eletrônica e mais.",
};

export default function Page() {
  return <DrumKitsClient />;
}
