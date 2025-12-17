import { useReadContracts, useAccount } from "wagmi";
import contractAddresses_1 from "@/addresses/1.json";
import contractAddresses_11155111 from "@/addresses/11155111.json";
import { useTokenIdsAlchemy } from "@/hooks/useTokenIdsAlchemy";
import { TroveManager } from "@/abi/TroveManager";
import { Trove, TroveTuple } from "@/types/borrow";

export default function useTroveState(): { troves: (Trove | null)[] } {
  const { chainId } = useAccount();  
  const currentNetworkContract = chainId === 1 || chainId === 31337 ? contractAddresses_1 : contractAddresses_11155111;
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
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.result && Array.isArray(result.result)) {
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
        ] = (result.result as unknown) as TroveTuple;
        const branch = currentNetworkContract.branches[i];
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
          collateralSymbol: branch.collSymbol,
        };
      }
    }
    return null;
  });

  return { troves };
}
