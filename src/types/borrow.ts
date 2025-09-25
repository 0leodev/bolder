export interface CollateralType {
  symbol: "ETH" | "wstETH" | "rETH"
  ltv: number
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
  balance: number
}

export interface ValidationError {
  field: string
  message: string
}

