"use client"

import download from "downloadjs"
import * as html2image from "html-to-image"
import { useAtom } from "jotai"
import { useRef } from "react"
import { toast } from "sonner"
import { uploadFile } from "../../packages/common-oss/upload"
import { getOssUrl } from "../../packages/common-oss/utils"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { ActionType } from "../schema/card"
import { cardAtom, cardOssIdAtom, cardRenderedAtom } from "../store/card.atom"
import { CardContent } from "./card-content"
import { CardFooter } from "./card-footer"
import { CardHeader } from "./card-header"
import { GenCardActionButton } from "./gen-card-action-button"
import { StandardCard } from "./standard-card"

export const GenCardPreview = () => {
  const [rendered] = useAtom(cardRenderedAtom)
  const [card] = useAtom(cardAtom)
  const [cardOssId] = useAtom(cardOssIdAtom)
  const obj = useRef<HTMLDivElement>(null)

  const action = async (type: ActionType) => {
    console.log({ type })
    if (!obj.current) return

    const blob = await html2image.toBlob(obj.current, {
      pixelRatio: 4 /* 这个因子非常重要，否则低端浏览器图片会很糊 */,
      backgroundColor: "transparent", // 好像没用。。。微信手机端还是有白色倒角。。
    })
    if (!blob) return

    switch (type) {
      case "copy":
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ])
        toast.success("copied image to clipboard")
        break

      case "download":
        download(blob, `${encodeURI(card?.title ?? new Date().toString())}.png`)
        break

      case "upload":
        if (!cardOssId) return
        const file = new File([blob], cardOssId, {
          type: blob.type,
        })
        await uploadFile(file)
        toast.success(`uploaded at ${getOssUrl(cardOssId)}`, { duration: 0 })
    }
  }

  return (
    <StandardCard
      title={"Preview"}
      className={cn(" w-full sm:max-w-[375px] flex flex-col gap-2")}
    >
      <div className={"flex justify-around gap-2"}>
        <GenCardActionButton
          action={action}
          type={"copy"}
          disabled={!rendered}
        />
        <GenCardActionButton
          action={action}
          type={"download"}
          disabled={!rendered}
        />
        <GenCardActionButton
          action={action}
          type={"upload"}
          disabled={!rendered}
        />
      </div>

      <div ref={obj} className={"w-full font-card corner-gradient"}>
        <CardHeader />

        <div className={"w-full grow gap-2 p-2 min-h-72"}>
          <CardContent />
        </div>

        <CardFooter />
      </div>
    </StandardCard>
  )
}
