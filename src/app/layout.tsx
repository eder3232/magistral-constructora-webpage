import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { LenisProvider } from "@/components/providers/lenis-provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magistral Constructora | Departamentos en Arequipa",
  description:
    "Departamentos y proyectos inmobiliarios en las mejores zonas de Arequipa. Tu hogar está aquí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${montserrat.variable} antialiased flex flex-col min-h-screen`}
      >
        <LenisProvider>
          <TooltipProvider>
            <Navbar />
            <main className="flex-1 pt-16 md:pt-20">{children}</main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
