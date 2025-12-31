import type { CollateralType } from "@/types/borrow";

export const COLLATERAL_TYPES: CollateralType[] = [
  {
    symbol: "ETH",
    ltvMax: 90.91,
    icon: "/logos/ETH.svg",
  },
  {
    symbol: "WETH",
    ltvMax: 90.91,
    icon: "/logos/WETH.svg",
  },
  {
    symbol: "wstETH",
    ltvMax: 83.33,
    icon: "/logos/wstETH.svg",
  },
  {
    symbol: "rETH",
    ltvMax: 83.33,
    icon: "/logos/rETH.svg",
  },
];

export const MIN_BORROW_AMOUNT = 2000;
export const MIN_INTEREST_RATE = 0.5;
export const MAX_INTEREST_RATE = 25.0;
export const LIQUIDATION_GAS_COMPENSATION = "0.0375";
