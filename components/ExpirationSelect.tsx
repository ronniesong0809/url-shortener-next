'use client'

import { EXPIRATION_OPTIONS, getExpirationText } from '@/lib/expiration'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type UrlExpirationSelectProps = {
  value: number
  onValueChange: (value: string) => void
  disabled?: boolean
}

export function ExpirationSelect({ value, onValueChange, disabled }: UrlExpirationSelectProps) {
  return (
    <Select value={value.toString()} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[140px]">
        <SelectValue>{getExpirationText(value)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {EXPIRATION_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
