import yargsParser from "yargs-parser"
import { z } from "zod"

export const parseIndex = async (input: string) => {
  // /^\s*(\d+)\s*(.*?)\s*$/

  const args = yargsParser(input)
  const index = await z.number().int().min(0).parseAsync(args._[0])

  return { index, rest: args._[1]?.toString() }
}
