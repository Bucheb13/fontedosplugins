import type { Metadata } from "next";
import DawsClient from "./DawsClient";

export const metadata: Metadata = {
  title: "DAWs | FonteDosPlugins",
  description:
    "Lista de DAWs profissionais como Ableton Live, FL Studio, Logic Pro e outras para produção musical.",
};

export default function DawsPage() {
  return <DawsClient />;
}
