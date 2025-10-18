"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InputFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  suffix?: React.ReactNode
  className?: string
}

export function InputField({ value, onChange, placeholder, error, suffix, className }: InputFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-10 bg-muted/30 border-border/50 text-base font-normal rounded-xl pr-16 placeholder:text-muted-foreground/50",
            error && "border-destructive/50",
          )}
        />
        {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>}
      </div>
      {error && <p className="text-xs text-destructive/80 px-1">{error}</p>}
    </div>
  )
}
