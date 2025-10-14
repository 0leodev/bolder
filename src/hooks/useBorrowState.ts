import { useState, useCallback ,useMemo } from 'react'
import { BorrowState, ValidationError } from "@/types/borrow"
import { COLLATERAL_TYPES, DEFAULT_INTEREST_RATE } from "@/config/constants"
import BorrowCalculations from "@/lib/borrow-calculations"


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

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const updateCollateralAmount = useCallback((amount: string) => {
    setState((prev) => ({ ...prev, collateralAmount: amount }));
  }, []);

  const updateBorrowAmount = useCallback((amount: string) => {
    setState((prev) => ({ ...prev, borrowAmount: amount }));
  }, []);

  const updateSelectedCollateral = useCallback((collateral: (typeof COLLATERAL_TYPES)[0]) => {
    setState((prev) => ({ ...prev, selectedCollateral: collateral }));
  }, []);

  const updateInterestRate = useCallback((rate: number) => {
    setState((prev) => ({ ...prev, interestRate: rate }));
  }, []);

  const updateMaxCollateral = useCallback(() => {
    const maxCollateral = state.selectedCollateral.symbol === "ETH"
        ? state.balance - 0.002
        : state.balance;
    setState((prev) => ({...prev, collateralAmount: maxCollateral.toString(), }));
  }, [state.selectedCollateral, state.balance]);  

  const calculatedValues = useMemo(() => {
    const collateralNum = Number.parseFloat(state.collateralAmount) || 0;
    const borrowNum = Number.parseFloat(state.borrowAmount) || 0;

    const maxBorrowAmount = BorrowCalculations.calculateMaxBorrowAmount(
      collateralNum,
      state.selectedCollateral
    );

    const currentLTV = BorrowCalculations.calculateCurrentLTV(
      borrowNum,
      collateralNum,
      state.selectedCollateral
    );

    const liquidationPrice = BorrowCalculations.calculateLiquidationPrice(
      borrowNum,
      collateralNum,
      state.selectedCollateral
    );

    return { maxBorrowAmount, currentLTV, liquidationPrice }
    
  }, [state.collateralAmount, state.borrowAmount, state.selectedCollateral]);

}