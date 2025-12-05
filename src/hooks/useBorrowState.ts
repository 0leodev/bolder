import { useState, useCallback, useMemo, useEffect } from "react";
import { BorrowState, ValidationError } from "@/types/borrow";
import { COLLATERAL_TYPES } from "@/lib/constants";
import BorrowCalculations from "@/lib/borrow-calculations";
import { useAssetBalances } from "@/hooks/useBalances";
import { usePriceFeeds } from "@/hooks/usePriceFeeds";
import useAvgInterest from "@/hooks/useAvgInterest";

export default function useBorrowState() {
  const balances = useAssetBalances();
  const prices = usePriceFeeds();

  const [state, setState] = useState<BorrowState>({
    collateralAmount: "",
    borrowAmount: "",
    selectedCollateral: COLLATERAL_TYPES[0],
    interestRate: 0,
    maxBorrowAmount: 0,
    liquidationPrice: 0,
    currentLTV: 0,
  });

  const avgInterest = useAvgInterest(state.selectedCollateral.symbol);

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

  useEffect(() => {
    updateInterestRate(avgInterest);
  }, [avgInterest, updateInterestRate]);

  const updateMaxCollateral = useCallback(() => {
    const currentBalance = balances[state.selectedCollateral.symbol];
    setState((prev) => ({ ...prev, collateralAmount: currentBalance.toString() }));
  }, [state.selectedCollateral, balances]);

  const updateMaxBorrowAmount = useCallback(() => {
    const collateralNum = parseFloat(state.collateralAmount) || 0;
    const maxBorrow = BorrowCalculations.calculateMaxBorrowAmount(collateralNum, state.selectedCollateral, prices);
    setState((prev) => ({ ...prev, borrowAmount: (maxBorrow * 0.9).toFixed(0) }));
  }, [state.collateralAmount, state.selectedCollateral, prices]);

  const calculatedValues = useMemo(() => {
    const collateralNum = parseFloat(state.collateralAmount) || 0;
    const borrowNum = parseFloat(state.borrowAmount) || 0;

    const maxBorrowAmount = BorrowCalculations.calculateMaxBorrowAmount(
      collateralNum,
      state.selectedCollateral,
      prices
    );

    const currentLTV = BorrowCalculations.calculateCurrentLTV(
      borrowNum,
      collateralNum,
      state.selectedCollateral,
      prices
    );

    const liquidationPrice = BorrowCalculations.calculateLiquidationPrice(
      borrowNum,
      collateralNum,
      state.selectedCollateral
    );

    return { maxBorrowAmount, currentLTV, liquidationPrice }

  }, [state.collateralAmount, state.borrowAmount, state.selectedCollateral, prices]);

  const validateInputs = useCallback(() => {
    const validationErrors = BorrowCalculations.validateBorrowInputs(
      state.collateralAmount,
      state.borrowAmount,
      state.selectedCollateral,
      balances[state.selectedCollateral.symbol],
      prices
    );
    setErrors(validationErrors);
    return validationErrors.length === 0;
  }, [state.collateralAmount, state.borrowAmount, state.selectedCollateral, balances, prices]);

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