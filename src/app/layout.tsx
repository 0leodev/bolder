"use client";
import "./globals.css";
import WalletProviders from "@/providers/WalletProviders";
import { Navigation } from "@/components/navigation";
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
          <Navigation />
          <div className="pt-10">
            {children}
          </div>
        </WalletProviders>
        <Toaster />
      </body>
    </html>
  );
}