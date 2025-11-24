import { useReadContracts, useAccount } from "wagmi";
import { useMemo } from "react";
import contractAddresses_1 from "@/addresses/1.json";
import contractAddresses_11155111 from "@/addresses/11155111.json";
import { useTokenIdsAlchemy } from "@/hooks/useTokenIdsAlchemy";
import { TroveManager } from "@/abi/TroveManager";
import { Trove, TroveTuple } from "@/types/borrow";

export default function useTroveState(): { troves: (Trove | null)[] } {
  const { chainId } = useAccount();  
  const currentNetworkContract = useMemo(() => chainId === 1 ? contractAddresses_1 : contractAddresses_11155111, [chainId]);
  const { tokenIds } = useTokenIdsAlchemy();

  const { data: troveInfo } = useReadContracts({
    contracts: tokenIds.flatMap(id =>
      currentNetworkContract.branches.map(branch => ({
        address: branch.troveManager as `0x${string}`,
        abi: TroveManager,
        functionName: "Troves",
        args: [BigInt(id)],
      }))
    ),
  });

  const troves = tokenIds.map((_, index) => {
    const start = index * currentNetworkContract.branches.length;
    const end = start + currentNetworkContract.branches.length;
    const results = troveInfo?.slice(start, end) || [];
    const validResult = results.find(d => d.result && Array.isArray(d.result));
    if (!validResult?.result) return null;
    const [
      debt,
      coll,
      stake,
      status,
      arrayIndex,
      lastDebtUpdateTime,
      lastInterestRateAdjTime,
      annualInterestRate,
      interestBatchManager,
      batchDebtShares,
    ] = (validResult.result as unknown) as TroveTuple;
    return {
      debt,
      coll,
      stake,
      status,
      arrayIndex,
      lastDebtUpdateTime,
      lastInterestRateAdjTime,
      annualInterestRate,
      interestBatchManager,
      batchDebtShares,
    };
  });

  return { troves };
}

// TODO: Make a array with all the data of each trove.
// The first element [0] will contain a event handler with a redirection to the /borrow route.
// First element [0] will be like "open trove" or something.


