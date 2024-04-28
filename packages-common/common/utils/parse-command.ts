import yargsParser, { Options } from "yargs-parser"

export const parseCommand = (argv: string, opts?: Options) => {
  return yargsParser(argv.replace(/\n/g, " "), opts)
}
