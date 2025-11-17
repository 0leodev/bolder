import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import contractAddresses_1 from "@/addresses/1.json";
import contractAddresses_11155111 from "@/addresses/11155111.json";
import { env_alchemy } from "@/config/env"

interface OwnedNft {
  tokenId: string;
}

interface UseTokenIdsAlchemyReturn {
  tokenIds: string[];
  isLoading: boolean;
  error: Error | null;
}

export function useTokenIdsAlchemy(): UseTokenIdsAlchemyReturn {
  const { address, chainId } = useAccount();
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const currentNetworkContract = useMemo(() => chainId === 1 ? contractAddresses_1 : contractAddresses_11155111, [chainId]);
  const troveNftContracts = useMemo(() => currentNetworkContract.branches.map(branch => branch.troveNFT), [currentNetworkContract]);

  useEffect(() => {
    if (!address) {
      setError(new Error("Address not available"));
      setTokenIds([]);
      setIsLoading(false);
      return;
    }

    const fetchTokenIds = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const alchemyApiKey = env_alchemy.API_KEY;
        if (!alchemyApiKey) throw new Error("ALCHEMY_API_KEY not configured")

        const currentNetwork = chainId === 1 ? "eth-mainnet" : "eth-sepolia";

        const contractAddressesQuery = troveNftContracts.map(addr => `contractAddresses=${addr}`).join('&');
        const url = `https://${currentNetwork}.g.alchemy.com/nft/v3/${alchemyApiKey}/getNFTsForOwner?owner=${address}&${contractAddressesQuery}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Alchemy API error: ${response.statusText}`);
        const data = await response.json();
  
        const allIds = data.ownedNfts.map((nft: OwnedNft) => nft.tokenId);
        const filteredIds = allIds.filter((id: string | undefined): id is string => id !== undefined);

        setTokenIds(filteredIds);
      } catch(err) {
        setError(err instanceof Error ? err : new Error(`Unknown error: ${String(err)}`));
        setTokenIds([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenIds();
  }, [address, chainId, troveNftContracts]);

  return { tokenIds, isLoading, error };
}
