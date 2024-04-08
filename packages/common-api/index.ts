// import { env } from "@/env"
import { AxiosInstance } from "axios"
import { createHttpInstance } from "./core"

export const api: AxiosInstance = createHttpInstance()

export const backendApi = createHttpInstance({
  baseURL: "", // env.NEXT_PUBLIC_BACKEND_URL,
})
