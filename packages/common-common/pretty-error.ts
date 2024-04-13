import { AxiosError } from "axios"
import { prettyString } from "./pretty-string"

export const prettyError = (e: unknown) => {
  const s =
    e instanceof AxiosError
      ? `${e.message}: ${JSON.stringify(e.response?.data)}}`
      : e instanceof Error
        ? e.message
        : (e as string)
  console.error("[ERR]: " + prettyString(JSON.stringify(s), 120))
  return s
}
