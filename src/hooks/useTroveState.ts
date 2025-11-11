import { useReadContract } from "wagmi";
import contractAddresses from "@/addresses/11155111.json";
import { TroveNFT } from "@/abi/TroveNFT";
import { useAccount } from "wagmi";

export default function useTroveState() {
  const { address } = useAccount();

  const { data: troveNFTBalance } = useReadContract({
    address: contractAddresses.branches[0].troveNFT as `0x${string}`,
    abi: TroveNFT,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const troves = troveNFTBalance ? Array.from({ length: (Number(troveNFTBalance) - 1 ) }) : [];

  return { state: { troves } };
}

// TODO: Make a array with all the data of each trove.
// The first element [0] will contain a event handler with a redirection to the /borrow route.
// First element [0] will be like "open trove" or something.
