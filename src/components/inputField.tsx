"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InputFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  suffix?: React.ReactNode
  suffix2?: React.ReactNode
  className?: string
  prClass?: string
}

export function InputField({ value, onChange, placeholder, error, suffix, suffix2, className, prClass }: InputFieldProps) {
  const hasBothSuffixes = suffix && suffix2;
  
  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, '').split('.').slice(0, 2).join('.'))}
          placeholder={placeholder}
          className={cn(
            "h-10 bg-muted/30 border-border/50 text-base font-normal rounded-xl placeholder:text-muted-foreground/50",
            prClass,
            error && "border-destructive/50",
          )}
        />
        {(suffix || suffix2) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {suffix}
            {suffix2}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive/80 px-1">{error}</p>}
    </div>
  )
}
