export const genRandomId = () => {
  return Array.from({ length: 8 })
    .map(() => (Math.random() * 10).toFixed(0))
    .join("")
}
