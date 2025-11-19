export interface CollateralType {
  symbol: "ETH" | "wstETH" | "rETH"
  ltvMax: number
  icon: string
}

export interface BorrowState {
  collateralAmount: string
  borrowAmount: string
  selectedCollateral: CollateralType
  interestRate: number
  maxBorrowAmount: number
  liquidationPrice: number
  currentLTV: number
}

export interface ValidationError {
  field: string
  message: string
}

export interface Trove {
  debt: bigint
  coll: bigint
  stake: bigint
  status: number
  arrayIndex: bigint
  lastDebtUpdateTime: bigint
  lastInterestRateAdjTime: bigint
  annualInterestRate: bigint
  interestBatchManager: `0x${string}`
  batchDebtShares: bigint
}