"use client"

import { PRICE_FEEDS } from "@/lib/constants"
import type { CollateralType } from "@/types/borrow"

interface StatsDisplayProps {
  collateralType: CollateralType
  currentLTV: number
  maxLTV: number
  liquidationPrice: number
  interestCost: number
}

export function StatsDisplay({
  collateralType,
  currentLTV,
  maxLTV,
  liquidationPrice,
  interestCost,
}: StatsDisplayProps) {
  const currentPrice = PRICE_FEEDS[collateralType.symbol]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/10 rounded-xl p-3 border border-border/90">
          <div className="text-xs text-muted-foreground/70 mb-1">Current Price</div>
          <div className="text-sm font-medium">${currentPrice.toLocaleString()}</div>
        </div>

        <div className="bg-muted/10 rounded-xl p-3 border border-border/90">
          <div className="text-xs text-muted-foreground/70 mb-1">Liquidation Price</div>
          <div className="text-sm font-medium truncate">
          <div className="text-sm font-medium truncate">
            ${liquidationPrice > 0 ? liquidationPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}</div>     
          </div>
        </div>
      </div>

      <div className="bg-muted/10 rounded-xl p-3 border border-border/90">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-muted-foreground/70">LTV Ratio</span>
          <span className="text-sm font-medium"> 
            {currentLTV < maxLTV ? `${currentLTV}%` : `>${maxLTV}%`} / {maxLTV}%
          </span>
        </div>
        <div className="w-full bg-muted/40 rounded-full h-1.5">
          <div
            className="bg-foreground/60 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((currentLTV / maxLTV) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="bg-muted/10 rounded-xl p-3 border border-border/90">
        <div className="text-xs text-muted-foreground/70 mb-1">Interest Cost/Year</div>
        <div className="text-sm font-medium">{interestCost} BOLD</div>
      </div>
    </div>
  )
}
