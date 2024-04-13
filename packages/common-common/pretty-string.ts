export const prettyString = (s: string, maxLength = 30) => {
  if (s.length <= maxLength) return s
  const n = maxLength / 2
  return s.slice(0, n) + "..." + s.slice(s.length - n)
}
