import { RefObject, useEffect } from "react"
import { ICard } from "../schema/card"
import { useAtom, useSetAtom } from "jotai"
import { realtimeContentAtom } from "../store/card.atom"

export const useInitCardContent = ({
  card: {
    body: { content: cardContent },
    type,
  },
}: {
  card: ICard
}) => {
  const setContent = useSetAtom(realtimeContentAtom)

  // 1. init content
  useEffect(() => {
    if (!cardContent) return
    setContent(cardContent)
  }, [cardContent, type])
}
export const useAutoCardContent = ({
  refText,
}: {
  refText: RefObject<HTMLDivElement>
}) => {
  const [content, setContent] = useAtom(realtimeContentAtom)

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
