"use client"

import useBorrowState from "@/hooks/useBorrowState"
import BorrowCalculations from "@/lib/borrow-calculations"
import { borrowSubmitted } from "@/lib/sonner-notifications"
import { InputField } from "@/components/inputField"
import { Button } from "@/components/ui/button"
import { CollateralSelector } from "@/components/collateralSelector"
import { useCollateralBalances, getCollateralBalance } from "@/hooks/useBalances"
import { formatNumber } from "@/utils/format"
import { InterestRateSlider } from "@/components/interestRateSlider"

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
    <div className="max-w-lg mx-auto space-y-6">
      <div className="space-y-6">

{/*----------------------------- COLLATERAL BOX ------------------------*/}        
        <div className="bg-card rounded-2xl p-4 border border-border/50" data-box="COLLATERAL BOX">
          <span className="text-lg font-medium text-muted-foreground text-white/70">Collateral</span>

          <div className="mt-5 flex gap-2">
            <div className="flex-1">   
            <InputField
              value={state.collateralAmount}
              onChange={actions.updateCollateralAmount}
              placeholder="0.00"
              error={getFieldError("collateral")}
              prClass={"pr-15"}
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
            </div> 
            <CollateralSelector
              selectedCollateral={state.selectedCollateral}
              onSelect={actions.updateSelectedCollateral}
            />
          </div>

          <div className="flex justify-start mt-5">
            <span className="text-xs text-muted-foreground font-bold">
              {getCollateralBalance(balances, state.selectedCollateral).toFixed(3)} {state.selectedCollateral.symbol}
            </span>
          </div>
        </div>      

{/*----------------------------- BORROW BOX ------------------------*/}  
        <div className="bg-card rounded-2xl p-4 border border-border/50" data-box="BORROW BOX">
          <span className="text-lg font-medium text-muted-foreground text-white/70">Borrow</span>

          <div className="mt-2 flex gap-1">
            {boldOptions.map(({ percent, emoji }) => {
              const amount = state.maxBorrowAmount * percent;
              return amount > 2000 ? (
                <Button
                  key={percent}
                  onClick={() => actions.updateBorrowAmount(amount.toFixed(0))}
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 h-6 font-bolde"
                >
                  {emoji} {formatNumber(amount)}
                </Button>
              ) : null;
            })}
          </div>

          <div className="mt-3 flex gap-2">
              <div className="flex-1">
              <InputField
                value={state.borrowAmount}
                onChange={actions.updateBorrowAmount}
                placeholder="Minimum 2000"
                error={getFieldError("borrow")}
                prClass={"pr-15"}
                suffix2={
                  <Button
                    onClick={actions.updateMaxBorrowAmount}
                    className="px-2 text-xs h-6 font-bold"
                    variant="ghost"
                  >
                    MAX
                  </Button>
                }
              />
                </div>
            <div className="flex items-center justify-center bg-navigation border border-border/30 rounded-xl px-4 min-w-[100px] h-10">
              <span className="text-sm font-bold">BOLD</span>
            </div>
          </div>

          <div className="flex justify-start mt-5">
            <span className="text-xs text-muted-foreground font-bold">
              {formatNumber(state.maxBorrowAmount * 0.9)} BOLD
            </span>
          </div>
        </div> 

        {/* INTEREST RATE SLIDER */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <InterestRateSlider value={state.interestRate} onChange={actions.updateInterestRate} />    
        </div>          

      </div>
    </div>
  )
}