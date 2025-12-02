import "./globals.css";
import WalletProviders from "@/providers/WalletProviders";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
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
      <body className="relative">
        <WalletProviders>
          <Navigation />
          <div className="pt-10 pb-25 flex-grow">{children}</div>
        </WalletProviders>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
