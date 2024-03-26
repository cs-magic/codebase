"use server"

import parse from "node-html-parser"

export interface IXiaoHongShuPage {
  url: string
  title?: string
  description?: string
  images: string[]
}

export const parseXiaoHongShuPage = async (
  url: string,
): Promise<IXiaoHongShuPage> => {
  console.log({ url })

  const res = await fetch(url, {
    headers: {
      "User-Agent": "PostmanRuntime/7.36.3", // 不加的话会提示系统版本过低
    },
  })

  const data = await res.text()

  const root = parse(data)

  const description = root
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")

  const title = root
    .querySelector('meta[name="og:title"]')
    ?.getAttribute("content")
    ?.replace(" - 小红书", "")

  const images = root
    .querySelectorAll('meta[name="og:image"]')
    .map((r) => r.getAttribute("content")!)

  // console.log({ data })

  return {
    url,
    description,
    title,
    images,
  }
}
