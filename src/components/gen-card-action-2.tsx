import download from "downloadjs"
import { useAtom } from "jotai"
import { RefObject } from "react"
import { toast } from "sonner"
import { uploadFile } from "../../packages/common-oss/upload"
import { getOssUrl } from "../../packages/common-oss/utils"
import { Action2Type, ActionType } from "../schema/card"
import { cardAtom, cardOssIdAtom } from "../store/card.atom"
import { GenCardActionButton } from "./gen-card-action-button"

import * as html2image from "html-to-image"
import html2canvas from "html2canvas"

export const GenCardAction2 = ({
  type,
  obj,
  rendered,
}: {
  type: Action2Type
  obj: RefObject<HTMLDivElement>
  rendered: boolean
}) => {
  const [card] = useAtom(cardAtom)
  const [cardOssId] = useAtom(cardOssIdAtom)

  const action = async (
    type: ActionType,
    engine: "html2image" | "html2canvas" = "html2canvas",
  ) => {
    console.log({ type })
    if (!obj.current || !card) return

    const blob =
      engine === "html2image"
        ? await html2image.toBlob(obj.current, {
            pixelRatio: 4 /* 这个因子非常重要，否则低端浏览器图片会很糊 */,
            backgroundColor: "transparent", // 好像没用。。。微信手机端还是有白色倒角。。
          })
        : await new Promise<Blob | null>(async (resolve, reject) => {
            if (!obj.current || !card) return
            const h = await html2canvas(obj.current, {
              scale: 4,
            })
            return h.toBlob((data) => {
              console.log("blobCallback: ", data)
              return resolve(data)
            })
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
        const fp = `${card.platformType}_${card.platformId}.png`
        download(blob, fp)
        toast.success(`downloaded at ${fp}`)
        break

      case "upload":
        if (!cardOssId) return
        const file = new File([blob], cardOssId, {
          type: blob.type,
        })
        await uploadFile(file)
        toast.success(`uploaded at ${getOssUrl(cardOssId)}`)
    }
  }

  return (
    <GenCardActionButton action={action} type={type} disabled={!rendered} />
  )
}
