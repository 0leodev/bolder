"use client"

import { ChevronDown } from "lucide-react"
import type { CollateralType } from "@/types/borrow"
import { COLLATERAL_TYPES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAssetBalances } from "@/hooks/useBalances"
import Image from "next/image";

const wETHintoETH = (collSymbol: string) => collSymbol === "WETH" ? "ETH" : collSymbol;

interface CollateralSelectorProps {
  selectedCollateral: CollateralType // state
  onSelect: (collateral: CollateralType) => void // action
}

export function CollateralSelector({ selectedCollateral, onSelect}: CollateralSelectorProps) {
    const balances = useAssetBalances()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-12 rounded-[40px] focus-visible:ring-0 hover:bg-muted/50">
        <div className="flex justify-between gap-2 border-border/50 rounded-[40px] items-center">
          <Image src={selectedCollateral.icon} alt={selectedCollateral.symbol} width={24} height={24} />
          <span className="font-bold text-lg">
            {wETHintoETH(selectedCollateral.symbol)}
          </span>
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
            <span className="font-semibold text-base">
              <Image src={collateral.icon} alt={collateral.symbol} width={20} height={20} className="mr-2 inline" />
              {wETHintoETH(collateral.symbol)}
            </span>
            <span className="font-semibold text-sm mr-2">
              {(balances[collateral.symbol]).toFixed(3)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
