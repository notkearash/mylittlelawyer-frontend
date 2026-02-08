import type { Metadata } from "next";
import { Libre_Baskerville, IBM_Plex_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const fontHeader = Libre_Baskerville({
  variable: "--font-header",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const fontMain = IBM_Plex_Sans({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lahwita",
  description: "AI-powered legal assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontHeader.variable} ${fontMain.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
