"use server"

import { api } from "../api/api.js"
import { parseJs } from "../utils/parse-js.js"
import type { IXiaoHongShuNotePageData } from "./schema.js"

/**
 * approach 1 (via server json):
 *
 * approach 2 (via meta parse):
 *   const root = parse(data)
 *
 *   const description = root
 *     .querySelector('meta[name="description"]')
 *     ?.getAttribute("content")
 *
 *   const title = root
 *     .querySelector('meta[name="og:title"]')
 *     ?.getAttribute("content")
 *     ?.replace(" - 小红书", "")
 *
 *   const images = root
 *     .querySelectorAll('meta[name="og:image"]')
 *     .map((r) => r.getAttribute("content")!)
 *
 *   const video = root
 *     .querySelector('meta[name="og:video"]')
 *     ?.getAttribute("content")
 *
 * @param url
 */
export const fetchXiaoHongShuDetail = async (
  url: string,
): Promise<IXiaoHongShuNotePageData | null> => {
  console.log({ url })

  const { data: html } = await api.get<string>(url, {
    headers: {
      "User-Agent": "PostmanRuntime/7.36.3", // 不加的话会提示系统版本过低
    },
  })

  const jsonData = /window.__INITIAL_STATE__\s*=\s*(.*?)\s*<\/script>/.exec(
    html,
  )

  if (!jsonData?.[1]) return null

  const data = parseJs<IXiaoHongShuNotePageData>(jsonData[1])

  // console.log({ data })

  return data
}
