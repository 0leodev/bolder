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
  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.]/g, '').split('.').slice(0, 2).join('.');
            const num = parseFloat(value);
            if (!isNaN(num) && num > 100000000) {
              onChange('100000000');
            } else {
              onChange(value);
            }
          }}
          placeholder={placeholder}
          className={cn(
            "h-12 text-[1.8rem] md:text-[1.8rem] lg:text-[1.8rem] font-medium rounded-xl placeholder:text-muted-foreground/50 focus-visible:ring-0",
            prClass,
          )}
        />
        {(suffix || suffix2) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {suffix}
            {suffix2}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive/80">{error}</p>}
    </div>
  )
}
