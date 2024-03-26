"use server"

import { cookie2headers } from "./utils"

export const serverFetch = async (url: string, cookie: string) => {
  const res = await fetch(url, {
    // mode: "no-cors",
    headers: { cookie },
  })
  const data = await res.json()
  console.log({ data })
  return data
}
