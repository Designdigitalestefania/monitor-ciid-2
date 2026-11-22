import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MONITOR CIID 2.0",
  description: "Centro Inteligente de Información Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
