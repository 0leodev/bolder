import { useAssetBalances } from "@/hooks/useBalances";
import { usePriceFeeds } from "@/hooks/usePriceFeeds";
import Image from "next/image";
import { useState, useEffect } from "react";

const BalanceBox = ({ svg, balance, price, extraClass }: { svg: string; balance: number; price: number; extraClass?: string }) => {
  return (
    <div className={`flex flex-col justify-center bg-card rounded-2xl p-3 gap-1 text-lg font-medium items-center ${extraClass}`}>
      <div className="flex items-center gap-2 bg-custom-dark p-3 rounded-xl">
        <Image src={svg} alt={svg} width={25} height={25} />
        <div className="max-w-30 truncate">{balance.toFixed(2)}</div>
      </div>
      <span className="max-w-35 truncate text-sm text-muted-foreground mt-1">${(balance * price).toFixed(2)}</span>
    </div>
  );
};

export default function BalanceCard() {
  const balances = useAssetBalances();
  const prices = usePriceFeeds();

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    { svg: "/logos/BOLD.svg", balance: balances.BOLD, price: prices.BOLD },
    { svg: "/logos/sBOLD.svg", balance: balances.sBOLD, price: prices.sBOLD },
    { svg: "/logos/WETH.svg", balance: balances.WETH, price: prices.WETH },
    { svg: "/logos/wstETH.svg", balance: balances.wstETH, price: prices.wstETH },
    { svg: "/logos/rETH.svg", balance: balances.rETH, price: prices.rETH },
  ];

  const filtered = items.filter((item) => item.balance > 0);
  let displayCount;
  if (screenWidth >= 1280) displayCount = filtered.length;
  else if (screenWidth >= 1024) displayCount = 3;
  else if (screenWidth < 1024) displayCount = 2;
  else displayCount = filtered.length;
  const displayedItems = filtered.slice(0, displayCount);

  return (
    <div className="text-xl font-medium mb-5 w-fit">
      <div className="flex justify-between rounded-2xl gap-3 items-center">
        {displayedItems.map((item) => (
          <BalanceBox key={item.svg} svg={item.svg} balance={item.balance} price={item.price} />
        ))}
      </div>
    </div>    
  );

}