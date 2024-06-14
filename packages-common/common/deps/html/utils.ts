import { HTMLElement } from "node-html-parser"

export const parseMetaFromHtml = (
  html: HTMLElement,
  property: string,
  key: "property" | "name" = "property",
): string | null => {
  return (
    html.querySelector(`meta[${key}="${property}"]`)?.getAttribute("content") ??
    null
  )
}
