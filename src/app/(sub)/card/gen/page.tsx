"use client"

import { toBlob } from "html-to-image"
import { useAtom } from "jotai"
import { useRef } from "react"
import { toast } from "sonner"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Card } from "../../../../components/card"
import { Controls } from "../../../../components/card-gen-controls"
import { InputLine } from "../../../../components/card-gen-input-line"
import { useUserSummary } from "../../../../hooks/use-user-summary"
import { ICard } from "../../../../schema/card"
import {
  cardContentAtom,
  cardIFramesAtom,
  cardImagesAtom,
  cardTypeAtom,
  cardVideosAtom,
  urlParsedAtom,
} from "../../../../store/card.atom"

export default function GenCardPage() {
  const [cardType] = useAtom(cardTypeAtom)
  const [content] = useAtom(cardContentAtom)
  const [urlParsed] = useAtom(urlParsedAtom)
  const [images] = useAtom(cardImagesAtom)
  const [videos] = useAtom(cardVideosAtom)
  const [iFrames] = useAtom(cardIFramesAtom)

  const user = useUserSummary()
  const refCard = useRef<HTMLDivElement>(null)

  const card: ICard = {
    type: cardType,
    user: user ?? undefined,
    updatedAt: new Date(),
    body: {
      sourceUrl: urlParsed,
      content,
      images,
      iFrames,
      videos,
    },
  }

  const copyCard = async () => {
    if (!refCard.current) return console.error("no refCard current")

    const blob = await toBlob(refCard.current, {
      pixelRatio: 4 /* 这个因子非常重要，否则低端浏览器图片会很糊 */,
      backgroundColor: "transparent", // 好像没用。。。微信手机端还是有白色倒角。。
    })

    if (!blob) return

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ])
    toast.success("copied image to clipboard")
  }

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto"}
    >
      <InputLine />

      <Controls copyCard={copyCard} />

      {!card ? "You should login first." : <Card ref={refCard} card={card} />}
    </FlexContainer>
  )
}
