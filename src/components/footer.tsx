"use client";

import Image from "next/image";
import { COLLATERAL_TYPES } from "@/lib/constants";
import { usePriceFeeds } from "@/hooks/usePriceFeeds";

export default function Footer() {
    const prices = usePriceFeeds();
    const socialLinks = [
    { href: 'https://github.com/0leodev', icon: "/logos/github.svg", label: 'GitHub' },
    { href: 'https://x.com/0xleo_dev', icon: '/logos/x.svg', label: 'X (Twitter)' },
  ]
  return(
    <footer className="bg-navigation absolute bottom-0 left-0 right-0">
      <main className="p-10">
        <div className="flex justify-between items-center">
          <div className="w-17 social-links flex justify-start items-center gap-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                <Image src={link.icon} alt={link.label} width={26} height={26} />
              </a>
            ))}
          </div>

          { prices["WETH"] > 0 && (
          <div className="flex justify-start gap-2 bg-navigation p-3 rounded-[25px] font-medium text-lg text-muted-foreground w-fit">
            {COLLATERAL_TYPES.map((coll) => (
              <div key={coll.symbol} className={`flex justify-center gap-2 bg-card px-5 py-3 rounded-2xl min-w-34 ${coll.symbol !== 'WETH' ? 'hidden md:flex' : ''}`}>
                <Image src={coll.icon} alt={coll.symbol} width={24} height={24} />
                <div>{`$${prices[coll.symbol].toLocaleString()}`}</div>
              </div>
            ))}
          </div>)}

          <div className="w-17 flex justify-end">
            <Image src="/logos/BOLDER.svg" alt="BOLDER" width={50} height={50} />
          </div>
        </div>
      </main>        
    </footer>
  )
}