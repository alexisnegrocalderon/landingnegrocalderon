import type { Metadata } from "next";
import { Cormorant, Archivo } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NegrocAlderon | Sitios WOW FX",
  description: "Viaja por el mundo y ahora construyo presencia digital con alma. Shops, IA y automatización para marcas con identidad.",
  openGraph: {
    title: "NegrocAlderon | Sitios WOW FX",
    description: "No potencio marcas. Potencio personas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${archivo.variable} font-sans bg-dark text-cream overflow-x-hidden antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
