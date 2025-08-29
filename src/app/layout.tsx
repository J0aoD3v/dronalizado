import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PersonalizAgro - Mapeamento Inteligente",
  description:
    "Serviço de mapeamento agrícola com drones customizados para o pequeno e médio produtor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
