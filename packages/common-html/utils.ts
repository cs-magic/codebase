import { HTMLElement } from "node-html-parser"

export const parseMetaContent = (
  html: HTMLElement,
  property: string,
): string | null => {
  return (
    html
      .querySelector(`meta[property="${property}"]`)
      ?.getAttribute("content") ?? null
  )
}
