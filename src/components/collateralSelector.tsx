"use client"

import { ChevronDown } from "lucide-react"
import type { CollateralType } from "@/types/borrow"
import { COLLATERAL_TYPES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CollateralSelectorProps {
  selectedCollateral: CollateralType // state
  onSelect: (collateral: CollateralType) => void // action
}

export function CollateralSelector({ selectedCollateral, onSelect }: CollateralSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 px-3 bg-muted/50 border-border/50 hover:bg-muted/50 rounded-xl">
          <span className="text-base mr-1">{selectedCollateral.icon}</span>
          <span className="font-normal text-sm">{selectedCollateral.symbol}</span>
          <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-card/10 backdrop-blur-lg shadow-2xl border-border/50 rounded-xl">
        {COLLATERAL_TYPES.map((collateral) => (
          <DropdownMenuItem
            key={collateral.symbol}
            onClick={() => onSelect(collateral)}
            className="flex items-center gap-2 p-2 hover:bg-muted/30 cursor-pointer rounded-lg mx-1"
          >
            <span className="text-base">{collateral.icon}</span>
            <span className="font-normal text-sm">{collateral.symbol}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
