"use client"

import download from "downloadjs"

import * as html2image from "html-to-image"
import html2canvas from "html2canvas"
import { useAtom } from "jotai"
import { domToBlob } from "modern-screenshot"
import { RefObject } from "react"
import { toast } from "sonner"
import { uploadFile } from "../../packages/common-oss/upload"
import { getOssUrl } from "../../packages/common-oss/utils"
import { Action2Type, ActionType } from "../schema/card"
import {
  cardAtom,
  cardOssIdAtom,
  cardPreviewEngineAtom,
} from "../store/card.atom"
import { CardAction } from "./card-action"

export const CardAction2 = ({
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
  const [engine] = useAtom(cardPreviewEngineAtom)

  const action = async (type: ActionType) => {
    console.log({ type, engine })
    if (!obj.current || !card) return

    const blob =
      engine === "modern-screenshot"
        ? await domToBlob(obj.current, {
            scale: 4,
          })
        : engine === "html2image"
          ? await html2image.toBlob(obj.current, {
              pixelRatio: 4 /* 这个因子非常重要，否则低端浏览器图片会很糊 */,
              backgroundColor: "transparent", // 好像没用。。。微信手机端还是有白色倒角。。
            })
          : await new Promise<Blob | null>(async (resolve, reject) => {
              if (!obj.current || !card) return

              const canvas = await html2canvas(obj.current, {
                scale: 4,
              })

              canvas.toBlob((data) => {
                console.log("blobCallback: ", data)
                resolve(data)
              })
            })
    if (!blob) return

    switch (type) {
      //   case "copy":
      //     await navigator.clipboard.write([
      //       new ClipboardItem({
      //         "image/png": blob,
      //       }),
      //     ])
      //     toast.success("copied image to clipboard")
      //     break
      //
      //   case "download":
      //     const fp = `${card.platformType}_${card.platformId}.png`
      //     download(blob, fp)
      //     toast.success(`downloaded at ${fp}`, { closeButton: true, duration: 0 })
      //     break
      //
      case "upload":
        if (!cardOssId) return
        const file = new File([blob], cardOssId, {
          type: blob.type,
        })
        await uploadFile(file)
        toast.success(`uploaded at ${getOssUrl(cardOssId)}`, {
          closeButton: true,
        })
    }
  }

  return <CardAction action={action} type={type} disabled={!rendered} />
}
