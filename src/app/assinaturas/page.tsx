import type { Metadata } from "next";
import Assinaturas from "./Assinaturas";

export const metadata: Metadata = {
  title: "Assinaturas | FonteDosPlugins",
  description:
    "Escolha o plano ideal e tenha acesso imediato aos plugins do FonteDosPlugins com pagamento rápido via PIX.",
  robots: {
    index: false, // página transacional
    follow: true,
  },
};

export default function Page() {
  return <Assinaturas />;
}
