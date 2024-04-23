import { getEnv } from "../env"
import { createHttpInstance } from "./core"

const env = getEnv()
export const backendApi = createHttpInstance({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
})
