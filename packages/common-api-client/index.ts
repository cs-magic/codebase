import { AxiosInstance } from "axios"
import { env } from "../common-env"
import { createHttpInstance } from "./core"

export const api: AxiosInstance = createHttpInstance()

export const backendApi = createHttpInstance({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
})
