import type { CollateralType } from "@/types/borrow";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";

interface CollateralBalances {
  ETH: number;
  wstETH: number;
  rETH: number;
}

export function useCollateralBalances(): CollateralBalances {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const balances: CollateralBalances = {
    ETH: balance ? (parseFloat(formatUnits(balance.value, balance.decimals))) - 0.002 : 0,
    wstETH: 8.3,
    rETH: 5.7,
  };

  return balances;
}

export function getCollateralBalance(balances: CollateralBalances, collateral: CollateralType): number {
  return balances[collateral.symbol] || 0;
}
