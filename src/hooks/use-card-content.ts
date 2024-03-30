import { useAtom, useSetAtom } from "jotai"
import { RefObject, useEffect } from "react"
import { ICard } from "../schema/card"
import { cardRenderedContentAtom } from "../store/card.atom"

export const useInitCardContent = ({ card }: { card: ICard }) => {
  const setContent = useSetAtom(cardRenderedContentAtom)

  // console.log("-- useInitCardContent: ", { card })

  // 1. init content
  useEffect(() => {
    if (!card.body) return

    setContent(`# ${card.body.title}\n\n${card.body.content}`)
  }, [card])
}
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
