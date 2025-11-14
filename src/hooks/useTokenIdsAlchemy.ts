import { useState } from "react";
import { useAccount } from "wagmi";
import contractAddresses from "@/addresses/11155111.json";

interface UseTokenIdsAlchemyReturn {
  tokenIds: string[];
  isLoading: boolean;
  error: Error | null;
}

export function useTokenIdsAlchemy() {
  const { address, chainId } = useAccount();
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const contractAddress = contractAddresses.branches[0].troveNFT
}
