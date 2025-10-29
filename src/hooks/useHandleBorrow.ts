import { useAccount, useReadContract } from "wagmi";
import { borrowSubmitted } from "@/lib/sonner-notifications";
import { BorrowState } from "@/types/borrow";
import { parseEther } from "viem";
import { TroveNFT } from "@/abi/TroveNFT";
import contractAddresses from "@/addresses/11155111.json";

export default function useHandleBorrow(validateInputs: () => boolean, wholeState: BorrowState) {
  const { address } = useAccount();
  
  const { data: troveNFTBalance } = useReadContract({
    address: contractAddresses.branches[0].troveNFT as `0x${string}`,
    abi: TroveNFT,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });
  
  const collateralWei = parseEther(wholeState.collateralAmount);
  const borrowWei = parseEther(wholeState.borrowAmount);
  const interestRateWei = parseEther(wholeState.interestRate.toString());

  return () => {
    if (validateInputs()) {
      console.log("Opening trove with:", {
        owner: address,
        collateral: collateralWei,
        borrow: borrowWei,
        interestRate: interestRateWei,
        troveNFTBalance: troveNFTBalance?.toString(),
      });
      borrowSubmitted();
    }
  };
}


// G O A L

// CONTRACT: "wethZapper": "0x7e4a8e4691585c17341c31986cafcf86f0d1ded3",
// METHOD: openTroveWithRawETH (0xf926c2d2) from LeverageWETHZapper.ts

// https://sepolia.etherscan.io/address/0xbA9275C6f4D77df02245Aa346C286A122b37244d#writeContract
// https://sepolia.etherscan.io/address/0x7e4a8e4691585c17341c31986cafcf86f0d1ded3#writeContract

// openTroveWithRawETH payableAmount (ether)
// _params (tuple)
// address owner;
// uint256 ownerIndex;
// uint256 collAmount;
// uint256 boldAmount;
// uint256 upperHint;
// uint256 lowerHint;
// uint256 annualInterestRate;
// address batchManager;
// uint256 maxUpfrontFee;
// address addManager;
// address removeManager;
// address receiver;
