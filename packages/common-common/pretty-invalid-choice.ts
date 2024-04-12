import { LiteralUnionSchema } from "./schema"

export const prettyInvalidChoice = (
  input: string,
  choices: string[] | LiteralUnionSchema,
) => {
  const cs =
    choices instanceof Array ? choices : choices.options.map((o) => o.value)
  return `\`操作失败，原因：${input} ∉ {${cs.join(",")}}\`,`
}
