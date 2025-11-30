import "./globals.css";
import WalletProviders from "@/providers/WalletProviders";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bolder",
  description: "Borrow BOLD using ETH, wstETH and rETH ",
  keywords: "borrow, bold, dapp, bolder, eth, wsteth, reth",
  authors: [{ name: "leo.dev" }],
  icons: {
    icon: "/logos/BOLDER.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        <WalletProviders>
          <Navigation />
          <div className="pt-10">{children}</div>
        </WalletProviders>
        <Toaster />
      </body>
    </html>
  );
}
