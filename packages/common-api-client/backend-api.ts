import { createHttpInstance } from "./core"

// 因为这个api主要用于客户端使用，但是环境变量的读取需要用fs，所以就单独拆一下
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
if (!baseURL) throw new Error("no NEXT_PUBLIC_BACKEND_URL env")

export const backendApi = createHttpInstance({
  baseURL,
})
