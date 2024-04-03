import { ActionType } from "@/schema/card"
import download from "downloadjs"
import * as html2image from "html-to-image"
import { useAtom } from "jotai"
import { capitalize } from "lodash"
import { RefObject } from "react"
import { toast } from "sonner"
import { uploadFile } from "../../packages/common-oss/upload"
import { getOssUrl } from "../../packages/common-oss/utils"
import { Atom } from "../../packages/common-state-management/jotai/types"
import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import { genCardFromUrl } from "../core/gen-card"
import {
  cardAtom,
  cardCopyingAtom,
  cardDownloadingAtom,
  cardGeneratingAtom,
  cardGenOptionsAtom,
  cardInputUrlAtom,
  cardOssIdAtom,
  cardUploadingAtom,
} from "../store/card.atom"

export const ActionButton = ({
  disabled,
  type,
  obj,
}: {
  disabled?: boolean
  type: ActionType
  obj: RefObject<HTMLDivElement>
}) => {
  const [inputUrl] = useAtom(cardInputUrlAtom)
  const [cardOptions] = useAtom(cardGenOptionsAtom)
  const [card, setCard] = useAtom(cardAtom)
  const [cardOssId] = useAtom(cardOssIdAtom)
  const atomMap: Record<ActionType, Atom<boolean>> = {
    generate: cardGeneratingAtom,
    copy: cardCopyingAtom,
    download: cardDownloadingAtom,
    upload: cardUploadingAtom,
  }
  const [v, setV] = useAtom(atomMap[type])

  const action = async (type: ActionType) => {
    if (type === "generate") {
      setCard(null)
      const card = await genCardFromUrl(inputUrl, cardOptions)
      setCard(card)
    }

    if (!obj.current) return console.error("no refCard current")

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
        if (!cardOssId) return toast.error("invalid info")
        const file = new File([blob], cardOssId, {
          type: blob.type,
        })
        await uploadFile(file)
        toast.success(`uploaded at ${getOssUrl(cardOssId)}`, { duration: 0 })
    }
  }

  return (
    <ButtonWithLoading
      id={`${type}-card`}
      className={"w-24"}
      size={"sm"}
      loading={v}
      disabled={disabled}
      onClick={async () => {
        setV(true)
        await action(type)
        setV(false)
      }}
    >
      {capitalize(type)}
    </ButtonWithLoading>
  )
}
