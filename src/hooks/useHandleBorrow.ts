import { useAccount, useReadContract } from "wagmi";
import { borrowSubmitted } from "@/lib/sonner-notifications";
import { BorrowState } from "@/types/borrow";
import { parseEther } from "viem";
import { TroveNFT } from "@/abi/TroveNFT";
import { LIQUIDATION_GAS_COMPENSATION } from "@/lib/constants";
import useAvgInterest from "@/hooks/useAvgInterest";
import contractAddresses_1 from "@/addresses/1.json";
import contractAddresses_11155111 from "@/addresses/11155111.json";

export default function useHandleBorrow(validateInputs: () => boolean, wholeState: BorrowState) {
  const { address, chainId } = useAccount();
  const avgInterest = useAvgInterest(wholeState.selectedCollateral.symbol);

  const currentNetworkContract = chainId === 1 || chainId === 31337 ? contractAddresses_1 : contractAddresses_11155111;
  const currentBranch = currentNetworkContract.branches.find((b) => b.collSymbol === wholeState.selectedCollateral.symbol);

  const { data: troveNFTBalance } = useReadContract({
    address: currentBranch?.troveNFT as `0x${string}`,
    abi: TroveNFT,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  return () => {
    if (validateInputs() && address) {
      const collateralWei = wholeState.selectedCollateral.symbol === "WETH" ? BigInt(0) : parseEther(wholeState.collateralAmount);
      const gasCompensationWei = parseEther(LIQUIDATION_GAS_COMPENSATION);
      const value = wholeState.selectedCollateral.symbol === "WETH" ? parseEther(wholeState.collateralAmount) + gasCompensationWei : BigInt(0);
      const borrowWei = parseEther(wholeState.borrowAmount);
      const interestRateWei = parseEther(wholeState.interestRate.toString());
      const maxUpfrontFeeWei = parseEther((((parseFloat(wholeState.borrowAmount) * avgInterest * 0.01) / 365) * 7).toString());

      const params = {
        owner: address,
        ownerIndex: troveNFTBalance! + BigInt(1),
        collAmount: collateralWei,
        boldAmount: borrowWei,
        upperHint: BigInt(0),
        lowerHint: BigInt(0),
        annualInterestRate: interestRateWei,
        batchManager: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        maxUpfrontFee: maxUpfrontFeeWei,
        addManager: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        removeManager: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        receiver: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      };

      console.log("Opening trove with:", {
        value: value, 
        params,
      })

      borrowSubmitted();
    }
  };
}

// G O A L

// CONTRACT: "leverageZapper": "0xdccbd7a365aee086aa3b4ede8afe895b20770ae3",
// METHOD: openTroveWithRawETH from LeverageWETHZapper.ts

// openTroveWithRawETH payableAmount (ether)
// _params (tuple)
// 1 address owner; // address
// 2 uint256 ownerIndex; // troveNFTBalance
// 3 uint256 collAmount; // BigInt(0)
// 4 uint256 boldAmount; // borrowWei
// 5 uint256 upperHint;
// 6 uint256 lowerHint;
// 7 uint256 annualInterestRate; // interestRateWei
// 8 address batchManager; // 0x0000000000000000000000000000000000000000
// 9 uint256 maxUpfrontFee; // maxUpfrontFeeWei
// 10 address addManager; // 0x0000000000000000000000000000000000000000
// 11 address removeManager; // 0x0000000000000000000000000000000000000000
// 12 address receiver; // 0x0000000000000000000000000000000000000000

// 13 stateMutabilityPayable; // collateralWei + gasCompensationWei

// https://sepolia.etherscan.io/address/0xbA9275C6f4D77df02245Aa346C286A122b37244d#writeContract
// https://sepolia.etherscan.io/address/0x7e4a8e4691585c17341c31986cafcf86f0d1ded3#writeContract
