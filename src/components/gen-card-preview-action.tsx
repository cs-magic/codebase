import download from "downloadjs"
import * as html2image from "html-to-image"
import { useAtom } from "jotai"
import { RefObject } from "react"
import { toast } from "sonner"
import { uploadFile } from "../../packages/common-oss/upload"
import { getOssUrl } from "../../packages/common-oss/utils"
import { ActionType } from "../schema/card"
import { cardAtom, cardOssIdAtom } from "../store/card.atom"
import { GenCardActionButton } from "./gen-card-action-button"

export const GenCardPreviewAction = ({
  type,
  obj,
  rendered,
}: {
  type: ActionType
  obj: RefObject<HTMLDivElement>
  rendered: boolean
}) => {
  const [card] = useAtom(cardAtom)
  const [cardOssId] = useAtom(cardOssIdAtom)

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
        const fp = `${card?.platformType}_${card?.platformId}.png`
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
