"use client"

import { usePriceFeeds } from "@/hooks/usePriceFeeds"
import type { CollateralType } from "@/types/borrow"
import { currencyString } from "@/utils/format"
import { motion } from "framer-motion"

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

  const prices = usePriceFeeds();
  const currentPrice = prices[collateralType.symbol]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="bg-custom-dark p-3 space-y-3 rounded-[25px]"> 
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/20 rounded-xl p-3 border border-border/90">
            <div className="text-xs text-muted-foreground/70 mb-1">Current Price</div>
            <div className="text-sm font-medium">${currentPrice.toLocaleString()}</div>
          </div>

          <div className="bg-muted/20 rounded-xl p-3 border border-border/90">
            <div className="text-xs text-muted-foreground/70 mb-1">Liquidation Price</div>
            <div className="text-sm font-medium truncate">
            <div className="text-sm font-medium truncate">
              ${liquidationPrice > 0 ? currencyString(liquidationPrice) : "0.00"}</div>     
            </div>
          </div>
        </div>

        <div className="bg-muted/20 rounded-xl p-3 border border-border/90">
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

        <div className="bg-muted/20 rounded-xl p-3 border border-border/90">
          <div className="text-xs text-muted-foreground/70 mb-1">Interest Cost/Year</div>
          <div className="text-sm font-medium">{interestCost.toLocaleString()} BOLD</div>
        </div>
      </div>
    </motion.div>
  )
}
