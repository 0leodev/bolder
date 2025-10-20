"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { MIN_INTEREST_RATE, MAX_INTEREST_RATE, AVG_INTEREST_RATE } from "@/lib/constants"

interface InterestRateSliderProps {
  value: number // state interestRate
  onChange: (value: number) => void // action updateInterestRate
}

export function InterestRateSlider({ value, onChange }: InterestRateSliderProps) {
  const [customInput, setCustomInput] = useState("")
  const [isCustomMode, setIsCustomMode] = useState(false)

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
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">Interest Rate</span>
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
            className="w-16 h-7 text-xs text-center border-border/50 focus:border-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            placeholder={value.toFixed(2)}
          />
          <span className="text-sm font-medium">%</span>
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

      <div className="flex justify-between text-xs text-muted-foreground/60">
        <span>{MIN_INTEREST_RATE}%</span>
        <span>Avg: {AVG_INTEREST_RATE}%</span>
        <span>{MAX_INTEREST_RATE}%</span>
      </div>
    </div>
  )
}
