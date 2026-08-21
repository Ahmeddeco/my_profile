import { format } from "date-fns"

export const fnsDateFormat = (day: Date | undefined) => {
  if (!day) return ""
  return format(day, "yyyy-MM-dd")
}