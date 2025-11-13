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
        <Button variant="outline" className="h-10 px-3 bg-muted/50 border-border/50 hover:bg-muted/50 rounded-xl">
          <span className="text-base mr-1">{selectedCollateral.icon}</span>
          <span className="font-bold text-sm">{selectedCollateral.symbol}</span>
          <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 mr-6 bg-card/10 backdrop-blur-lg border-border/50 rounded-xl">
        {COLLATERAL_TYPES.map((collateral) => (
          <DropdownMenuItem
            key={collateral.symbol}
            onClick={() => onSelect(collateral)}
            className="flex items-center m-2 justify-between p-2 bg-muted/10 hover:bg-muted/30 cursor-pointer rounded-md mx-1"
          >
            <span className="font-semibold text-base">{collateral.icon} {collateral.symbol}</span>
            <span className="font-semibold text-sm mr-2">{getCollateralBalance(balances, collateral.symbol).toFixed(3)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
