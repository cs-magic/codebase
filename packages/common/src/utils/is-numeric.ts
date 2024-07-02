/**
 * ref: https://stackoverflow.com/a/58550111/9422455
 * @param num
 */
export const isNumeric = (num: any) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN(num as number)
