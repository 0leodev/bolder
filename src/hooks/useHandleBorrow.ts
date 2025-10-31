import { useAccount, useReadContract } from "wagmi";
import { borrowSubmitted } from "@/lib/sonner-notifications";
import { BorrowState } from "@/types/borrow";
import { parseEther } from "viem";
import { TroveNFT } from "@/abi/TroveNFT";
import contractAddresses from "@/addresses/11155111.json";
import { AVG_INTEREST_RATE } from "@/lib/constants";

export default function useHandleBorrow(validateInputs: () => boolean, wholeState: BorrowState) {
  const { address } = useAccount();

  const { data: troveNFTBalance } = useReadContract({
    address: contractAddresses.branches[0].troveNFT as `0x${string}`,
    abi: TroveNFT,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  return () => {
    if (validateInputs() && address) {
      const collateralWei = parseEther(wholeState.collateralAmount);
      const borrowWei = parseEther(wholeState.borrowAmount);
      const interestRateWei = parseEther(wholeState.interestRate.toString());
      const maxUpfrontFeeWei = parseEther((((parseFloat(wholeState.borrowAmount) * AVG_INTEREST_RATE * 0.01) / 365) * 7).toString());
      
      console.log("Opening trove with:", {
        owner: address,
        collateral: collateralWei,
        borrow: borrowWei,
        interestRate: interestRateWei,
        troveNFTBalance: troveNFTBalance?.toString(),
        maxUpfrontFee: maxUpfrontFeeWei,
      });

      borrowSubmitted();
    }
  };
}

// G O A L

// CONTRACT: "wethZapper": "0x7e4a8e4691585c17341c31986cafcf86f0d1ded3",
// METHOD: openTroveWithRawETH (0xf926c2d2) from LeverageWETHZapper.ts

// openTroveWithRawETH payableAmount (ether)
// _params (tuple)
// 1 address owner; // address
// 2 uint256 ownerIndex; // troveNFTBalance
// 3 uint256 collAmount; // collateralWei
// 4 uint256 boldAmount; // borrowWei
// 5 uint256 upperHint;
// 6 uint256 lowerHint;
// 7 uint256 annualInterestRate; // interestRateWei
// 8 address batchManager; // 0x0000000000000000000000000000000000000000 
// 9 uint256 maxUpfrontFee; // maxUpfrontFeeWei
// 10 address addManager; // 0x0000000000000000000000000000000000000000
// 11 address removeManager; // 0x0000000000000000000000000000000000000000
// 12 address receiver; // 0x0000000000000000000000000000000000000000

// https://sepolia.etherscan.io/address/0xbA9275C6f4D77df02245Aa346C286A122b37244d#writeContract
// https://sepolia.etherscan.io/address/0x7e4a8e4691585c17341c31986cafcf86f0d1ded3#writeContract