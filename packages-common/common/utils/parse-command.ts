import yargsParser, { Options } from "yargs-parser"

export const parseCommand = (argv: string, opts?: Options) => {
  // 如果我们不加一个空格的话，会导致 \n 被理解为一个读入的字符
  // 但保留 \n 还是必要的
  return yargsParser(argv.replace(/\n/g, " \n"), opts)
}
