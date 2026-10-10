import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist } from "next/font/google";

import { siteConfig } from "~/config/site";
import { TRPCReactProvider } from "~/trpc/react";

import { Providers } from "./_components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} – Portfolio`,
  description: "Portfolio and interactive resume",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
