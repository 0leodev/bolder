import TrovesCard from "@/components/dashboard/trove-card"
import Link from "next/link";
import { useAssetBalances } from "@/hooks/useBalances"
import { usePriceFeeds } from "@/hooks/usePriceFeeds"
import Image from "next/image";

const BalanceBox = ({svg, balance, price, extraClass}: {svg: string, balance: number, price: number, extraClass?: string}) => (
  <div className={`flex flex-col w-33 justify-center bg-card rounded-2xl p-3 gap-1 text-lg font-medium items-center truncate ${extraClass}`}>
    <div className="flex items-center gap-2 bg-custom-dark p-3 rounded-xl">
      <Image src={svg} alt={svg} width={25} height={25}/ >
      {(balance).toFixed(3)}
    </div>
    <span className="text-sm text-muted-foreground mt-1">${ (balance * price).toFixed(2) }</span>
  </div>
)

export default function DashboardCard() {
  const balances = useAssetBalances();
  const priceFeeds = usePriceFeeds();
  const prices = { ...priceFeeds, BOLD: 1 }; // meaning that BOLD is at $1 USD
  return(
    <main>
      <div className="flex justify-between gap-4 mb-7 items-center">
        <Link href="/borrow">
          <button className="rounded-2xl bg-gradient-to-br from-muted/90 to-card/10 px-8 py-4 text-lg font-medium shadow-lg transition-all duration-300 hover:scale-[0.95] hover:from-navigation/90 active:scale-[0.98]">
            <span>New Borrow</span>
          </button>
        </Link>
      </div>

      <div className="text-xl font-medium mb-5 w-fit">
        <div className="flex justify-between rounded-2xl gap-3 items-center">
          <BalanceBox svg={"/logos/BOLD.svg"} balance={balances.BOLD} price={prices.BOLD}/>
          <BalanceBox svg={"/logos/WETH.svg"} balance={balances.WETH} price={prices.WETH}/>
          <BalanceBox svg={"/logos/wstETH.svg"} balance={balances.wstETH} extraClass={"hidden sm:flex"}  price={prices.wstETH}/>
          <BalanceBox svg={"/logos/rETH.svg"} balance={balances.rETH} extraClass={"hidden sm:flex"} price={prices.rETH}/>
        </div>
      </div>

      <TrovesCard/>
    </main>
  )
}