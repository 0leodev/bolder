import TrovesCard from "@/components/dashboard/trove-card"
import Link from "next/link";
import Image from "next/image";
import { COLLATERAL_TYPES } from "@/lib/constants";
import { usePriceFeeds } from "@/hooks/usePriceFeeds";

export default function DashboardCard() {
  const prices = usePriceFeeds();
  return(
    <main>
      <div className="flex justify-between gap-4 mb-7 items-center">
        <Link href="/borrow">
          <button className="rounded-2xl bg-gradient-to-br from-muted/90 to-card/10 px-8 py-4 text-lg font-medium shadow-lg transition-all duration-300 hover:scale-[0.95] hover:from-navigation/90 active:scale-[0.98]">
            <span>New Borrow</span>
          </button>
        </Link>

        { prices["WETH"] > 0 && (
        <div className="flex justify-start gap-2 bg-navigation p-3 rounded-[25px] font-medium text-lg text-muted-foreground w-fit">
          {COLLATERAL_TYPES.map((coll) => (
            <div key={coll.symbol} className={`flex justify-center gap-2 bg-card px-5 py-3 rounded-2xl min-w-34 ${coll.symbol !== 'WETH' ? 'hidden md:flex' : ''}`}>
              <Image src={coll.icon} alt={coll.symbol} width={24} height={24} />
              <div>{`$${prices[coll.symbol].toLocaleString()}`}</div>
            </div>
          ))}
        </div>)}
      </div>
      <TrovesCard/>
    </main>
  )
}