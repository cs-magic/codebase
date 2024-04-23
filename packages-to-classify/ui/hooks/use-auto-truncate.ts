import { RefObject, useEffect, useState } from "react"

/**
 * 自动根据是否溢出确定字符
 *
 * const {content} = useAutoTruncate(ref, init, {step, maxLen, ellipse})
 *
 * @param refText
 * @param initContent
 * @param options
 */
export const useAutoTruncate = ({
  refText,
  initContent,
  options,
}: {
  refText: RefObject<HTMLDivElement>
  initContent: string
  options?: {
    step?: number
    maxLen?: number
    ellipse?: string
  }
}) => {
  const [content, setContent] = useState(initContent)

  // 2. overflow
  useEffect(() => {
    if (!refText.current) return

    const { scrollHeight, clientHeight } = refText.current
    const overflow = scrollHeight > clientHeight
    // console.log({ content, scrollHeight, clientHeight, overflow })
    if (!overflow) return

    setContent(
      (content) =>
        content?.slice(
          0,
          Math.min(
            content?.length - (options?.step ?? 5),
            options?.maxLen ?? 100,
          ),
        ) + (options?.ellipse ?? "…"),
    )
  }, [content])

  return { content }
}
