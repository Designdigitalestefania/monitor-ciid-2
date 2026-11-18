import type { Metadata } from "next";
export const metadata: Metadata = { title: "MONITOR CIID", description: "Centro Inteligente de Información Digital" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return (<html lang="es"><body>{children}</body></html>); }
