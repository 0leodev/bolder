import { useState } from 'react'
import { BorrowState } from "@/types/borrow"
import { COLLATERAL_TYPES, DEFAULT_INTEREST_RATE } from "@/config/constants"


export default function useBorrowState() {
  const [state, setState] = useState<BorrowState>({
    collateralAmount: "",
    borrowAmount: "",
    selectedCollateral: COLLATERAL_TYPES[0],
    interestRate: DEFAULT_INTEREST_RATE,
    maxBorrowAmount: 0,
    liquidationPrice: 0,
    currentLTV: 0,
    balance: 10, // Mock balance
  });
}