import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import contractAddresses_1 from "@/addresses/1.json";
import contractAddresses_11155111 from "@/addresses/11155111.json";

const residualEth = 0.1; // residue (avoid using all the ETH)

interface AssetBalances {
  WETH: number;
  wstETH: number;
  rETH: number;
  BOLD: number;
  sBOLD: number;
}

export function useAssetBalances(): AssetBalances {
  const { address, chainId } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const currentNetworkContract = chainId === 1 ? contractAddresses_1 : contractAddresses_11155111;

  const ethParsed = ethBalance ? parseFloat((formatUnits(ethBalance.value, ethBalance.decimals))) : 0;
  const ethBalanceParsed = ethParsed > residualEth ? ethParsed - residualEth : 0;

  // const { data: wstETHBalance } = useBalance({address, token: currentNetworkContract.branches[1].collToken as `0x${string}`});
  // const wstETHBalanceParsed = wstETHBalance ? parseFloat(formatUnits(wstETHBalance.value, wstETHBalance.decimals)) : 0

  // Temporary change for testing
  const { data: wstETHBalance } = useBalance({address, token: currentNetworkContract.branches[1].collToken as `0x${string}`});
  const wstETHBalanceParsed = wstETHBalance ? parseFloat("12.45") : 0

  const { data: rETHBalance } = useBalance({address, token: currentNetworkContract.branches[2].collToken as `0x${string}`});
  const rETHBalanceParsed = rETHBalance ? parseFloat(formatUnits(rETHBalance.value, rETHBalance.decimals)) : 0

  const { data: boldBalance } = useBalance({address, token: currentNetworkContract.boldToken as `0x${string}`});
  const boldBalanceParsed = boldBalance ? parseFloat(formatUnits(boldBalance.value, boldBalance.decimals)) : 0

  const { data: sBoldBalance } = useBalance({address, token: currentNetworkContract.sBoldToken as `0x${string}`});
  const sBoldBalanceParsed = sBoldBalance ? parseFloat(formatUnits(sBoldBalance.value, sBoldBalance.decimals)) : 0

  const balances: AssetBalances = {
    WETH: parseFloat(ethBalanceParsed.toFixed(3)),
    wstETH: wstETHBalanceParsed,
    rETH: rETHBalanceParsed,
    BOLD: boldBalanceParsed,
    sBOLD: sBoldBalanceParsed,
  };

  return balances;
}
