import { useReadContracts } from "wagmi";
import contractAddresses from "@/addresses/11155111.json";
import { useTokenIdsAlchemy } from "@/hooks/useTokenIdsAlchemy";
import { TroveManager } from "@/abi/TroveManager";
import { Trove } from "@/types/borrow";

export default function useTroveState(): { troves: (Trove | null)[] } {
  const { tokenIds } = useTokenIdsAlchemy();

  const { data: troveInfo } = useReadContracts({
    contracts: tokenIds.map(id => ({
      address: contractAddresses.branches[0].troveManager as `0x${string}`,
      abi: TroveManager,
      functionName: "Troves",
      args: [BigInt(id)],
    })),
  });

  const troves = troveInfo?.map(d => {
    if (!d.result || !Array.isArray(d.result)) return null;
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
    ] = d.result;
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
  }) || [];

  return { troves };
}

// TODO: Make a array with all the data of each trove.
// The first element [0] will contain a event handler with a redirection to the /borrow route.
// First element [0] will be like "open trove" or something.
