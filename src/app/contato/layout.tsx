import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | FonteDosPlugins",
  description:
    "Entre em contato com o FonteDosPlugins para dúvidas, suporte ou informações sobre plugins de áudio e assinaturas.",
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
