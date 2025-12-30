export interface CollateralType {
  symbol: "ETH" | "WETH" | "wstETH" | "rETH";
  ltvMax: number;
  icon: string;
}

export type collOptions = "ETH" | "WETH" | "wstETH" | "rETH";

export interface BorrowState {
  collateralAmount: string;
  borrowAmount: string;
  selectedCollateral: CollateralType;
  interestRate: number;
  maxBorrowAmount: number;
  liquidationPrice: number;
  currentLTV: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type TroveTuple = [
  debt: bigint,
  coll: bigint,
  stake: bigint,
  status: number,
  arrayIndex: bigint,
  lastDebtUpdateTime: bigint,
  lastInterestRateAdjTime: bigint,
  annualInterestRate: bigint,
  interestBatchManager: `0x${string}`,
  batchDebtShares: bigint
];

export interface Trove {
  debt: bigint;
  coll: bigint;
  stake: bigint;
  status: number;
  arrayIndex: bigint;
  lastDebtUpdateTime: bigint;
  lastInterestRateAdjTime: bigint;
  annualInterestRate: bigint;
  interestBatchManager: `0x${string}`;
  batchDebtShares: bigint;
  collateralSymbol: string;
}
