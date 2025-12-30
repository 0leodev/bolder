import contractAddresses_1 from "@/addresses/1.json";
import contractAddresses_11155111 from "@/addresses/11155111.json";
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { collOptions } from "@/types/borrow"
import { ActivePool } from "@/abi/ActivePool"
import { removeDigits } from "@/utils/format";

export default function useAvgInterest(collType: collOptions) {
  const { chainId } = useAccount();
  
  const currentNetworkAddress = chainId === 1 || chainId === 31337 ? contractAddresses_1 : contractAddresses_11155111;
  const currentNetworkBranch = currentNetworkAddress.branches.find(b => b.collSymbol === collType);
  const mainnetBranch = contractAddresses_1.branches.find(b => b.collSymbol === collType);
  const branch = chainId ? currentNetworkBranch : mainnetBranch;

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

  const avgInterestRate = aggWeightedDebtSum && aggRecordedDebt ? removeDigits(aggWeightedDebtSum / aggRecordedDebt, 16) : 0.5;

  return avgInterestRate
}
