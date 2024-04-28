import parse from "yargs-parser"

/**
 * 2024/04/28 14:27:41 ➜  codebase git:(main) ✗ tsx packages-common/common/utils/parse-command.ts
 * {
 *   _: [ 87, 'false', 'hhh' ],
 *   a: true,
 *   b: [ true, true, true ],
 *   c: 43,
 *   d: '43',
 *   e: '42da',
 *   f: false,
 *   g: 'false',
 *   h: true,
 *   i: 432,
 *   bss: 'e2e',
 *   ss: 'scscs'
 * }
 */
console.log(
  parse(
    "87 false hhh -a -bbb -c=43 -d=43 -e=42da -f=false -g=false -hi=432 --bss=e2e --ss scscs",
    {
      string: ["d"],
      boolean: ["f"],
    },
  ),
)
