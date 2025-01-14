export const EXPIRATION_OPTIONS = [
  { value: "0", label: "Never expires" },
  { value: "1", label: "1 day" },
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
] as const

export function getExpirationText(days: number) {
  const option = EXPIRATION_OPTIONS.find(opt => opt.value === days.toString())
  return option?.label ?? `${days} days`
} 