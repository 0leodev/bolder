import { useState, useCallback ,useMemo } from 'react'
import { BorrowState, ValidationError } from "@/types/borrow"
import { COLLATERAL_TYPES, AVG_INTEREST_RATE } from "@/lib/constants"
import BorrowCalculations from "@/lib/borrow-calculations"

export default function useBorrowState() {
  const [state, setState] = useState<BorrowState>({
    collateralAmount: "",
    borrowAmount: "",
    selectedCollateral: COLLATERAL_TYPES[0],
    interestRate: AVG_INTEREST_RATE,
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

  const updateMaxBorrowAmount = useCallback(() => {
    const collateralNum = parseFloat(state.collateralAmount) || 0;
    const maxBorrow = BorrowCalculations.calculateMaxBorrowAmount(collateralNum,state.selectedCollateral);
    setState((prev) => ({ ...prev, borrowAmount: (maxBorrow * 0.9).toFixed(0) }));
  }, [state.collateralAmount, state.selectedCollateral]);

  const calculatedValues = useMemo(() => {
    const collateralNum = parseFloat(state.collateralAmount) || 0;
    const borrowNum = parseFloat(state.borrowAmount) || 0;

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

  const validateInputs = useCallback(() => {
    const validationErrors = BorrowCalculations.validateBorrowInputs(
      state.collateralAmount,
      state.borrowAmount,
      state.selectedCollateral
    );
    setErrors(validationErrors);
    return validationErrors.length === 0;
  }, [state.collateralAmount, state.borrowAmount, state.selectedCollateral]);

  return {
    state: {
      ...state,
      ...calculatedValues,
    },
    errors,
    actions: {
      updateCollateralAmount,
      updateBorrowAmount,
      updateSelectedCollateral,
      updateInterestRate,
      updateMaxCollateral,
      updateMaxBorrowAmount,
      validateInputs,
    },
  };
}