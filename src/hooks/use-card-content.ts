import { useAtom } from "jotai"
import { RefObject, useEffect } from "react"
import { cardRenderedContentAtom } from "../store/card.atom"

export const useAutoCardContent = ({
  refText,
}: {
  refText: RefObject<HTMLDivElement>
}) => {
  const [content, setContent] = useAtom(cardRenderedContentAtom)

  // 2. overflow
  useEffect(() => {
    if (!refText.current) return

    const { scrollHeight, clientHeight } = refText.current
    const overflow = scrollHeight > clientHeight
    // console.log({ content, scrollHeight, clientHeight, overflow })
    if (!overflow) return

    setContent(
      (content) => content?.slice(0, Math.min(content?.length - 5, 100)) + "…",
    )
  }, [content])
}
