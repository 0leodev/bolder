import { useState, useEffect } from "react";
import { coingecko } from "@/config/env";
import { sBOLD } from "@/abi/sBOLD";
import { useReadContract } from "wagmi";
import contractAddresses_1 from "@/addresses/1.json";
import { formatUnits } from "viem";

export interface PriceFeeds {
  ETH: number;
  WETH: number;
  wstETH: number;
  rETH: number;
  BOLD: number;
  sBOLD: number;
}

const twoDigits = (num: number) => parseFloat(num.toFixed(2));

export function usePriceFeeds(): PriceFeeds {
  const [prices, setPrices] = useState<PriceFeeds>({
    ETH: 0.0,
    WETH: 0.0,
    wstETH: 0.0,
    rETH: 0.0,
    BOLD: 0.0,
    sBOLD: 0.0,
  });

  const { data: sBoldRate } = useReadContract({
    address: contractAddresses_1.sBoldToken as `0x${string}`,
    abi: sBOLD,
    functionName: "getSBoldRate",
    chainId: 1,
  });
  const sBoldRateParsed = sBoldRate ? parseFloat(formatUnits(sBoldRate, 18)) : 0;

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum,weth,wrapped-steth,rocket-pool-eth&vs_currencies=usd&x_cg_demo_api_key=${coingecko.API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        setPrices({
          ETH: twoDigits(data.ethereum?.usd),
          WETH: twoDigits(data.weth?.usd),
          wstETH: twoDigits(data["wrapped-steth"]?.usd),
          rETH: twoDigits(data["rocket-pool-eth"]?.usd),
          BOLD: 1,
          sBOLD: sBoldRateParsed,
        });
      } catch (error) {
        console.error("Failed to fetch price feeds:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  return prices;
}
