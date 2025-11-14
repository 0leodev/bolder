import { useState } from "react";
import { useAccount, usePublicClient } from "wagmi";

interface UseTokenIdsReturn {
  tokenIds: bigint[];
  isLoading: boolean;
  error: Error | null;
}

export function useTokenIds() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [tokenIds, setTokenIds] = useState<bigint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
}
