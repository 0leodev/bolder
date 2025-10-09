"use client";
import "./globals.css";
import WalletProviders from "@/providers/WalletProviders";
import TopBar from "@/components/TopBar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProviders>
          <TopBar />
          {children}
        </WalletProviders>
        <Toaster />
      </body>
    </html>
  );
}