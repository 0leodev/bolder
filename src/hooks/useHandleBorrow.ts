import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransactionReceipt } from "wagmi/actions";
import { borrowSubmitted } from "@/lib/sonner-notifications";
import { BorrowState } from "@/types/borrow";
import { parseEther } from "viem";
import { LIQUIDATION_GAS_COMPENSATION } from "@/lib/constants";
import useAvgInterest from "@/hooks/useAvgInterest";
import contractAddresses_1 from "@/addresses/1.json";
import contractAddresses_11155111 from "@/addresses/11155111.json";
import { config as wagmiConfig } from "@/config/wagmiConfig";
import { HintHelpers } from "@/abi/HintHelpers";
import { SortedTroves } from "@/abi/SortedTroves";
import { LeverageWETHZapper } from "@/abi/LeverageWETHZapper";
import { LeverageLSTZapper } from "@/abi/LeverageLSTZapper";
import { BorrowerOperations } from "@/abi/BorrowerOperations"
import { erc20Abi } from "viem";

export default function useHandleBorrow(validateInputs: () => boolean, wholeState: BorrowState) {
  const { address, chainId } = useAccount();
  const symbol = wholeState.selectedCollateral.symbol;
  const branchSymbol = symbol === "ETH" ? "WETH" : symbol;
  const avgInterest = useAvgInterest(branchSymbol);

  const currentNetworkContract = chainId === 1 || chainId === 31337 ? contractAddresses_1 : contractAddresses_11155111;
  const currentBranch = currentNetworkContract.branches.find((b) => b.collSymbol === branchSymbol);

  return async () => {
    if (validateInputs() && address && currentBranch) {
      const ownerIndex = BigInt("0x" + Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join(""));
      const collateralWei = parseEther(wholeState.collateralAmount);
      const gasCompensationWei = parseEther(LIQUIDATION_GAS_COMPENSATION);

      const isETH = symbol === "ETH";
      const isWETH = symbol === "WETH";
      const value = isETH ? collateralWei + gasCompensationWei : isWETH ? 0n : gasCompensationWei;

      const borrowWei = parseEther(wholeState.borrowAmount);
      const interestRateWei = parseEther(wholeState.interestRate.toString());
      const maxUpfrontFeeWei = parseEther(((((parseFloat(wholeState.borrowAmount) * avgInterest * 0.01) / 365) * 7) * 1.1).toString());

      if (!isETH) {
        const collToken = currentBranch.collToken as `0x${string}`;
        const spender = (isWETH ? currentBranch.borrowerOperations : currentBranch.leverageZapper) as `0x${string}`;
        const needed = isWETH ? collateralWei + gasCompensationWei : collateralWei;

        const allowance = await readContract(wagmiConfig, {
          address: collToken,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address, spender],
        });

        if (allowance < needed) {
          const approveHash = await writeContract(wagmiConfig, {
            address: collToken,
            abi: erc20Abi,
            functionName: "approve",
            args: [spender, needed],
          });
          await waitForTransactionReceipt(wagmiConfig, { hash: approveHash });
        }
      }

      // Get hints
      let collIndex = 0;
      if (symbol === "wstETH") collIndex = 1;
      else if (symbol === "rETH") collIndex = 2;

      const numTroves = await readContract(wagmiConfig, {
        address: currentBranch.sortedTroves as `0x${string}`,
        abi: SortedTroves,
        functionName: "getSize",
      });

      const numTrials = BigInt(Math.floor(Math.sqrt(Number(numTroves)))) * 15n;

      const [approxHint] = await readContract(wagmiConfig, {
        address: currentNetworkContract.hintHelpers as `0x${string}`,
        abi: HintHelpers,
        functionName: "getApproxHint",
        args: [BigInt(collIndex), interestRateWei, numTrials, BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))],
      });

      const [upperHint, lowerHint] = await readContract(wagmiConfig, {
        address: currentBranch.sortedTroves as `0x${string}`,
        abi: SortedTroves,
        functionName: "findInsertPosition",
        args: [interestRateWei, approxHint, approxHint],
      });

      const params = {
        owner: address,
        ownerIndex: ownerIndex,
        collAmount: collateralWei,
        boldAmount: borrowWei,
        upperHint: upperHint,
        lowerHint: lowerHint,
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

      let txHash: `0x${string}`;

      if (isWETH) {
        txHash = await writeContract(wagmiConfig, {
          address: currentBranch.borrowerOperations as `0x${string}`,
          abi: BorrowerOperations,
          functionName: "openTrove",
          args: [
            params.owner, params.ownerIndex, params.collAmount, params.boldAmount,
            params.upperHint, params.lowerHint, params.annualInterestRate, params.maxUpfrontFee,
            params.addManager, params.removeManager, params.receiver,
          ],
        });
      } else {
        txHash = await writeContract(wagmiConfig, {
          address: currentBranch.leverageZapper as `0x${string}`,
          abi: isETH ? LeverageWETHZapper : LeverageLSTZapper,
          functionName: "openTroveWithRawETH",
          args: [params],
          value,
        });
      }
      console.log("Transaction hash:", txHash);

      borrowSubmitted();
    }
  };
}


// C O N T E X T

// We call the function openTroveWithRawETH of the contract leverageZapper to open a trove using ETH, rETH, or wstETH as collateral.
// We call the function openTrove of the contract borrowerOperations to open a trove using WETH as collateral.

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
