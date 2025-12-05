"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { MIN_INTEREST_RATE, MAX_INTEREST_RATE } from "@/lib/constants"
import useAvgInterest from "@/hooks/useAvgInterest"
import { WETH_wstETH_rETH } from "@/types/borrow"

interface InterestRateSliderProps {
  value: number // state interestRate
  onChange: (value: number) => void // action updateInterestRate
  collType: WETH_wstETH_rETH
}

export function InterestRateSlider({ value, onChange, collType }: InterestRateSliderProps) {
  const [customInput, setCustomInput] = useState("")
  const [isCustomMode, setIsCustomMode] = useState(false)
  const avgInterest = useAvgInterest(collType)

  const handleSliderChange = (values: number[]) => {
    setIsCustomMode(false)
    setCustomInput("")
    onChange(values[0])
  }

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setCustomInput(inputValue)
    setIsCustomMode(true)
    const numValue = parseFloat(inputValue)
    if (!isNaN(numValue) && numValue >= MIN_INTEREST_RATE && numValue <= MAX_INTEREST_RATE) {
      onChange(numValue)
    }
  }

  const handleCustomInputBlur = () => {
    const numValue = parseFloat(customInput)
    const clampedValue = isNaN(numValue) ? value : Math.max(MIN_INTEREST_RATE, Math.min(MAX_INTEREST_RATE, numValue))
    onChange(clampedValue)
    setCustomInput("")
    setIsCustomMode(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium text-muted-foreground text-white/70">Interest Rate</span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={isCustomMode ? customInput : value.toFixed(2)}
            onChange={handleCustomInputChange}
            onBlur={handleCustomInputBlur}
            onFocus={() => setIsCustomMode(true)}
            min={MIN_INTEREST_RATE}
            max={MAX_INTEREST_RATE}
            step={0.1}
            className="w-auto h-auto border rounded-xl text-[1.5rem] md:text-[1.5rem] lg:text-[1.5rem] text-center border-border/50 focus-visible:ring-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] font-medium"
            placeholder={value.toFixed(2)}
          />
          <span className="font-medium text-[1.5rem] md:text-[1.5rem] lg:text-[1.5rem]">%</span>
        </div>
      </div>

      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={MIN_INTEREST_RATE}
        max={MAX_INTEREST_RATE}
        step={0.1}
        className="w-full"
      />

      <div className="flex justify-between text-sm text-muted-foreground font-medium">
        <span className="p-2">{MIN_INTEREST_RATE}%</span>
        <span
          className="bg-muted p-2 text-muted-foreground text-sm font-bold cursor-pointer hover:text-white rounded-lg"
          onClick={() => {
            onChange(avgInterest)
            setIsCustomMode(false)
            setCustomInput("")
          }}
        >
          Avg {avgInterest}%
        </span>
        <span className="p-2">{MAX_INTEREST_RATE}%</span>
      </div>
    </div>
  )
}
