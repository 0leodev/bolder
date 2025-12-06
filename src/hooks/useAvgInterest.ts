import contractAddresses_1 from "@/addresses/1.json";
import contractAddresses_11155111 from "@/addresses/11155111.json";
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { useMemo } from "react";
import { WETH_wstETH_rETH } from "@/types/borrow"
import { ActivePool } from "@/abi/ActivePool"
import { removeDigits } from "@/utils/format";

export default function useAvgInterest(collType: WETH_wstETH_rETH) {
  const { chainId } = useAccount();
  const currentNetworkContract = useMemo(() => chainId === 1 ? contractAddresses_1 : contractAddresses_11155111, [chainId]);

  const branch = currentNetworkContract.branches.find(b => b.collSymbol === collType);

  const { data: aggWeightedDebtSum } = useReadContract({
    address: branch?.activePool as `0x${string}`,
    abi: ActivePool,
    functionName: "aggWeightedDebtSum",
  });

  const { data: aggRecordedDebt } = useReadContract({
    address: branch?.activePool as `0x${string}`,
    abi: ActivePool,
    functionName: "aggRecordedDebt",
  });

  const avgInterestRate = aggWeightedDebtSum && aggRecordedDebt ? removeDigits(aggWeightedDebtSum / aggRecordedDebt, 16) : 0;

  return avgInterestRate
}
