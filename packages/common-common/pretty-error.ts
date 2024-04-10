import { AxiosError } from "axios"

export const prettyError = (e: unknown) => {
  const s =
    e instanceof AxiosError
      ? `${e.message}: ${JSON.stringify(e.response?.data)}}`
      : e instanceof Error
        ? e.message
        : (e as string)
  console.error(s)
  return s
}
