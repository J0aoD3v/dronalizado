// src/app/layout.tsx
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Dronalizado - Mapeamento Inteligente",
  description:
    "Serviço de mapeamento agrícola com drones customizados para pequenos e médios produtores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${onest.variable} font-onest`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
