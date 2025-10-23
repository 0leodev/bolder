"use client"

import useBorrowState from "@/hooks/useBorrowState"
import BorrowCalculations from "@/lib/borrow-calculations"
import { borrowSubmitted } from "@/lib/sonner-notifications"
import { InputField } from "@/components/inputField"
import { Button } from "@/components/ui/button"
import { CollateralSelector } from "@/components/collateralSelector"
import { useCollateralBalances, getCollateralBalance } from "@/hooks/useBalances"

const boldOptions = [
  { percent: 0.2, emoji: '🟢' },
  { percent: 0.4, emoji: '🟡' },
  { percent: 0.6, emoji: '🔴' },
];

export default function BorrowCard() {
  const { state, errors, actions } = useBorrowState()
  const balances = useCollateralBalances()

  const handleBorrow = () => {
    if (actions.validateInputs()) {
      console.log("Borrowing with state:", state)
      borrowSubmitted()
    }
  }
  
  const getFieldError = (field: string) => {
    return errors.find((error) => error.field === field)?.message
  }  

  const interestCost = BorrowCalculations.calculateInterestCost(
    parseFloat(state.borrowAmount) || 0,
    state.interestRate,
  )

  return (
    <div className="max-w-lg mx-auto p-2 space-y-6">
      <div className="bg-card rounded-2xl p-6 space-y-6 border border-border/50">

{/*----------------------------- COLLATERAL BOX ------------------------*/}        
        <div data-box="COLLATERAL BOX">
          <span className="text-lg font-medium text-muted-foreground">Collateral</span>

          <div className="mt-5 flex gap-2">
            <InputField
              value={state.collateralAmount}
              onChange={actions.updateCollateralAmount}
              placeholder="0.00"
              error={getFieldError("collateral")}
              prClass={"pr-42"}
              suffix={
                <span className="text-xs text-muted-foreground font-bold">
                  Available {getCollateralBalance(balances, state.selectedCollateral).toFixed(3)}
                </span>
              }
              suffix2={
                <Button
                  onClick={actions.updateMaxCollateral}
                  className="px-2 text-xs h-6 font-bold"
                  variant="ghost"
                >
                  MAX
                </Button>
              }
            />
            <CollateralSelector
              selectedCollateral={state.selectedCollateral}
              onSelect={actions.updateSelectedCollateral}
            />
          </div>
        </div>      

      </div>
    </div>
  )
}