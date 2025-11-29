"use client"

import { ChevronDown } from "lucide-react"
import type { CollateralType } from "@/types/borrow"
import { COLLATERAL_TYPES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCollateralBalances, getCollateralBalance } from "@/hooks/useBalances"

interface CollateralSelectorProps {
  selectedCollateral: CollateralType // state
  onSelect: (collateral: CollateralType) => void // action
}

export function CollateralSelector({ selectedCollateral, onSelect}: CollateralSelectorProps) {
    const balances = useCollateralBalances()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-12 rounded-[40px] focus-visible:ring-0 hover:bg-muted/50">
        <div className="flex justify-between gap-2 border-border/50 rounded-[40px] items-center">
          <img src={selectedCollateral.icon} className="w-6 h-6" />
          <span className="font-bold text-lg">{selectedCollateral.symbol}</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </div>  
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 mr-6 bg-card/10 backdrop-blur-lg border-border/50 rounded-xl">
        {COLLATERAL_TYPES.map((collateral) => (
          <DropdownMenuItem
            key={collateral.symbol}
            onClick={() => onSelect(collateral)}
            className="flex items-center m-2 justify-between p-2 bg-muted/10 hover:bg-muted/30 cursor-pointer rounded-md mx-1"
          >
            <span className="font-semibold text-base"><img src={collateral.icon} className="w-4 h-4 mr-1 inline" /> {collateral.symbol}</span>
            <span className="font-semibold text-sm mr-2">{getCollateralBalance(balances, collateral.symbol).toFixed(3)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
