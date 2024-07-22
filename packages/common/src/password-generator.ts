import { capitalize, range } from "lodash"

export enum PasswordPattern {
  Ascii,
  ByBit,
}

export const passwordGenerator = (
  platformName: string,
  pattern: PasswordPattern,
) => {
  const calcCode = (s: string, p: number) => {
    return (
      range(s.length)
        .map((i) => s.charCodeAt(i) - "A".charCodeAt(0))
        .reduce((a, b) => a + b, 0) % p
    )
  }

  const platformNameSection = capitalize(platformName)
  let codeSection: string = ""
  switch (pattern) {
    case PasswordPattern.Ascii:
      codeSection = calcCode(platformNameSection, 97)
        .toString()
        .padStart(2, "0")
      break
    case PasswordPattern.ByBit:
      codeSection = [2, 3, 5, 7]
        .map((c) => platformNameSection.length % c)
        .join("")
  }
  return [platformNameSection, codeSection].join("-")
}

console.log(passwordGenerator("apple", PasswordPattern.ByBit))
