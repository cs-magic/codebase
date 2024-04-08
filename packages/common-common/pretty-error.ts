import { AxiosError } from "axios"

export const prettyError = (e: unknown) => {
  console.error(
    e instanceof AxiosError
      ? `${e.message}: ${JSON.stringify(e.response?.data)}}`
      : e instanceof Error
        ? e.message
        : e,
  )
}
