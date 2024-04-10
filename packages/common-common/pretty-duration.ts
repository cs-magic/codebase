export const prettyDuration = (seconds: number, precision = 2) => {
  if (seconds < 60) return seconds.toFixed(precision) + "s"
  const minutes = seconds / 60
  if (minutes < 60) return minutes.toFixed(precision) + "m"
  const hours = minutes / 60
  if (hours < 24) return hours.toFixed(precision) + "h"
  const days = hours / 24
  return days.toFixed(precision) + "d"
}
