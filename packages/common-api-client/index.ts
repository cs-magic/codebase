import { AxiosInstance } from "axios"
import { loadEnv } from "../common-env/utils/load-env"
import { createHttpInstance } from "./core"

const env = loadEnv()

export const api: AxiosInstance = createHttpInstance()

export const backendApi = createHttpInstance({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
})
