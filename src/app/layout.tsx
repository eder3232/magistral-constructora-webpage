import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { LenisProvider } from "@/components/providers/lenis-provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magistral Constructora | Departamentos en Arequipa",
  description: "Departamentos y proyectos inmobiliarios en las mejores zonas de Arequipa. Tu hogar está aquí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <LenisProvider>
          <TooltipProvider>
            <Navbar />
            {children}
            <Toaster />
          </TooltipProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
