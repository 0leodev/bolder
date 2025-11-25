import { useState, useEffect } from 'react';

export interface PriceFeeds {
  WETH: number;
  wstETH: number;
  rETH: number;
}

const twoDigits = (num: number) => parseFloat(num.toFixed(2));

export function usePriceFeeds(): PriceFeeds {
  const [prices, setPrices] = useState<PriceFeeds>({
    WETH: 0.00,
    wstETH: 0.00,
    rETH: 0.00,
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,wrapped-steth,rocket-pool-eth&vs_currencies=usd';
        const response = await fetch(url);
        const data = await response.json();

        setPrices({
          WETH: twoDigits(data.ethereum?.usd),
          wstETH: twoDigits(data['wrapped-steth']?.usd),
          rETH: twoDigits(data['rocket-pool-eth']?.usd),
        });
      } catch (error) {
        console.error('Failed to fetch price feeds:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  return prices;
}