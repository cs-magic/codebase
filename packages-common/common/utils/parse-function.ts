export const parseFunction = (s?: string) => {
  // approach 1
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  // return new Function(`return function() { ${s} }`)()

  // approach 2
  return eval(`(function() {${s}})`)
}
