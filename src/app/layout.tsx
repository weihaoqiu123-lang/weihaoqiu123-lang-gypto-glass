import type { Metadata } from "next";
import "./globals.css";
import { SolanaProvider } from "@/components/solana-provider";

export const metadata: Metadata = {
  title: "Gypto-Glass",
  description:
    "Crypto-native eyewear with dynamic pricing, leverage-style deposits, and a bold collector-driven brand experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
