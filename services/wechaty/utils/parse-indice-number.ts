import { z } from "zod"

export const parseIndicesNumber = async (input: string) => {
  const m = /^\s*(\d+)\s*(\d+)\s*$/.exec(input)
  if (!m) throw new Error("输入不合法")
  const index = Number(m[1])
  const priority = await z
    .number()
    .int()
    .min(1)
    .max(9)
    .parseAsync(Number(m?.[2]))
  return { index, priority }
}
