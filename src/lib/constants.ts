import type { CollateralType } from "@/types/borrow";

export const COLLATERAL_TYPES: CollateralType[] = [
  {
    symbol: "ETH",
    ltv: 90.91,
    icon: "🔷",
  },
  {
    symbol: "wstETH",
    ltv: 83.33,
    icon: "💠",
  },
  {
    symbol: "rETH",
    ltv: 83.33,
    icon: "🔶",
  },
];

export const MIN_BORROW_AMOUNT = 2000;
export const DEFAULT_INTEREST_RATE = 5.5;
export const MIN_INTEREST_RATE = 0.5;
export const MAX_INTEREST_RATE = 25.0;

export const MIN_LTV_RATIO = 10.0;
export const MAX_LTV_RATIO = 95.0;

// Mock price feeds (in production, these would come from oracles)
export const PRICE_FEEDS = {
  ETH: 3200,
  wstETH: 3520,
  rETH: 3350,
};
