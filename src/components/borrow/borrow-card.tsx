"use client"

import useBorrowState from "@/hooks/useBorrowState"
import useHandleBorrow from "@/hooks/useHandleBorrow"
import BorrowCalculations from "@/lib/borrow-calculations"
import { InputField } from "@/components/inputField"
import { Button } from "@/components/ui/button"
import { CollateralSelector } from "@/components/borrow/collateralSelector"
import { useCollateralBalances, getCollateralBalance } from "@/hooks/useBalances"
import { metricNumber, currencyString } from "@/utils/format"
import { InterestRateSlider } from "@/components/borrow/interestRateSlider"
import { StatsDisplay } from "@/components/borrow/statsDisplay"
import { AlertCircle } from "lucide-react"
import { usePriceFeeds } from "@/hooks/usePriceFeeds";

const boldOptions = [
  { percent: 0.2, emoji: '🟢' },
  { percent: 0.4, emoji: '🟡' },
  { percent: 0.6, emoji: '🔴' },
];

export default function BorrowCard() {
  const { state, errors, actions } = useBorrowState()
  const balances = useCollateralBalances()
  const handleBorrow = useHandleBorrow(actions.validateInputs, state)
  const prices = usePriceFeeds();

  const getFieldError = (field: string) => {
    return errors.find((error) => error.field === field)?.message
  }  

  const interestCost = BorrowCalculations.calculateInterestCost(
    parseFloat(state.borrowAmount) || 0,
    state.interestRate,
  )

  return (
    <main className="max-w-lg mx-auto space-y-6">
      <div className="space-y-6">

{/*----------------------------- COLLATERAL BOX ------------------------*/}        
        <div className="bg-card rounded-2xl p-4 border border-border" data-box="COLLATERAL BOX">
          <span className="text-lg font-medium text-muted-foreground text-white/70">Collateral</span>

          <div className="mt-3 flex gap-2">
            <div className="flex-1">   
            <InputField
              value={state.collateralAmount}
              onChange={actions.updateCollateralAmount}
              placeholder="0.00"
              error={getFieldError("collateral")}
            />
            </div> 
            <CollateralSelector
              selectedCollateral={state.selectedCollateral}
              onSelect={actions.updateSelectedCollateral}
            />
          </div>

          <div className="flex justify-between gap-3 items-center mt-5">
              <span className="text-xs text-muted-foreground font-medium">
                ${currencyString(prices[state.selectedCollateral.symbol] * Number(state.collateralAmount))}
              </span>
            <div className="flex justify-end gap-3 items-center">
              <span className="text-xs text-muted-foreground font-medium">
                {getCollateralBalance(balances, state.selectedCollateral.symbol).toFixed(3)} {state.selectedCollateral.symbol}
              </span>
              <Button
                onClick={actions.updateMaxCollateral}
                className="bg-muted px-2 text-muted-foreground text-xs h-6 font-bold"
                variant="ghost"
              >
                MAX
              </Button>
            </div>
          </div>
        </div>      

{/*----------------------------- BORROW BOX ------------------------*/}  
        <div className="bg-card rounded-2xl p-4 border border-border" data-box="BORROW BOX">
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
                  {emoji} {metricNumber(amount)}
                </Button>
              ) : null;
            })}
          </div>

          <div className="mt-1 flex gap-2">
            <div className="flex-1">
              <InputField
                value={state.borrowAmount}
                onChange={actions.updateBorrowAmount}
                placeholder="Min 2000"
                error={getFieldError("borrow")}
              />
            </div>

            <div className="h-12 flex items-center justify-center gap-2 bg-navigation border border-border rounded-[40px] px-5">
              <img src="/logos/BOLD.svg" className="w-6 h-6" />
              <span className="font-bold text-lg">BOLD</span>
            </div>
          </div>
        
          <div className="flex justify-between gap-3 items-center mt-5">
              <span className="text-xs text-muted-foreground font-medium">
                ${currencyString(Number(state.borrowAmount))}
              </span>
            <div className="flex justify-end gap-3 items-center">
              <span className="text-xs text-muted-foreground font-medium">
                {metricNumber(state.maxBorrowAmount * 0.9)} BOLD
              </span>
              <Button
                onClick={actions.updateMaxBorrowAmount}
                className="bg-muted px-2 text-muted-foreground text-xs h-6 font-bold"
                variant="ghost"
              >
                MAX
              </Button>
            </div>
          </div>

        </div> 

            {/* INTEREST RATE SLIDER */}
            <div className="bg-card rounded-2xl p-4 border border-border">
              <InterestRateSlider value={state.interestRate} onChange={actions.updateInterestRate} />
            </div>

        {parseFloat(state.collateralAmount) > 0 && parseFloat(state.borrowAmount) > 0 && (
          <>
            {/* STATS DISPLAY */}
            <StatsDisplay
              collateralType={state.selectedCollateral}
              currentLTV={state.currentLTV}
              maxLTV={state.selectedCollateral.ltvMax}
              liquidationPrice={state.liquidationPrice}
              interestCost={interestCost}
            />

            {/* ERRORS */}
            {errors.length > 0 && ( 
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3">
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-3 w-3" />
                  <span>Please fix errors</span>
                </div>
                <div className="mt-1 space-y-1">
                  {errors.map((error, index) => (
                    <div key={index} className="text-xs text-destructive/80 ml-5">
                      {error.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBMIT TX */}
            <Button
              onClick={handleBorrow}
              className="w-full h-11 text-base font-bold bg-primary/90 text-primary-foreground hover:bg-primary/60 rounded-xl"
            >
              Borrow BOLD
            </Button>
          </>
        )}

      </div>
    </main>
  )
}

