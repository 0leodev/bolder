"use client"

import useBorrowState from "@/hooks/useBorrowState"
import BorrowCalculations from "@/lib/borrow-calculations"
import { borrowSubmitted } from "@/lib/sonner-notifications"

const boldOptions = [
  { percent: 0.2, emoji: '🟢' },
  { percent: 0.4, emoji: '🟡' },
  { percent: 0.6, emoji: '🔴' },
];

export default function BorrowCard() {
  const { state, errors, actions } = useBorrowState()

  const handleBorrow = () => {
    if (actions.validateInputs()) {
      console.log("Borrowing with state:", state)
      borrowSubmitted()
    }
  }

  const interestCost = BorrowCalculations.calculateInterestCost(
    parseFloat(state.borrowAmount) || 0,
    state.interestRate,
  )

  return (
    <div className="max-w-lg mx-auto p-2 space-y-6">
      <div className="bg-card rounded-2xl p-6 space-y-6 border border-border/50">

      </div>
    </div>
  )
}