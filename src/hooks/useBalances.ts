import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";

const residualEth = 0.002; // avoid using all the ETH

interface CollateralBalances {
  ETH: number;
  wstETH: number;
  rETH: number;
}

export function useCollateralBalances(): CollateralBalances {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const ethParsed = balance ? parseFloat((formatUnits(balance.value, balance.decimals))) : 0;
  const ethBalance = ethParsed > residualEth ? ethParsed - residualEth : 0;

  const balances: CollateralBalances = {
    ETH: parseFloat(ethBalance.toFixed(3)),
    wstETH: 8.3,
    rETH: 5.7,
  };

  return balances;
}

export function getCollateralBalance(balances: CollateralBalances, symbol: string): number {
  return balances[symbol as keyof CollateralBalances] || 0;
}
