"use client"

import { Action2Type, ActionType } from "@cs-magic/swot-core"
import { cardOssAtom, cardPreviewAtom } from "../store/card.atom"
import { cardPreviewEngineAtom } from "../store/card.rendered.atom"
import * as html2image from "html-to-image"
import html2canvas from "html2canvas"
import { useAtom } from "jotai"
import { domToBlob, domToJpeg } from "modern-screenshot"
import { RefObject } from "react"
import { toast } from "sonner"
import { updateOssUrl } from "../utils/update-oss-url.action"
import { GeneralCardAction } from "./card-action-general"
import { uploadFile } from "@cs-magic/common"

const handleDownload = ({
  blob,
  fileName = `${Date.now()}.jpg`,
}: {
  blob: Blob
  fileName?: string
}) => {
  // 创建一个URL
  const url = window.URL.createObjectURL(blob)

  // 创建一个隐藏的<a>元素
  const a = document.createElement("a")
  a.style.display = "none"
  a.href = url
  a.download = fileName

  // 将<a>元素添加到DOM并触发点击事件
  document.body.appendChild(a)
  a.click()

  // 清理
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)

  return fileName
}

export const PreviewCardAction = ({
  type,
  obj,
  rendered,
}: {
  type: Action2Type
  obj: RefObject<HTMLDivElement>
  rendered: boolean
}) => {
  const [preview] = useAtom(cardPreviewAtom)
  const [oss] = useAtom(cardOssAtom)
  const [engine] = useAtom(cardPreviewEngineAtom)

  const action = async (actionType: ActionType) => {
    console.log({ actionType, engine })
    if (!obj.current || !preview) return

    const scale = 4
    // quality 要配合 type 才有用，see: https://github.com/qq15725/modern-screenshot/blob/main/src/converts/dom-to-blob.ts
    const type = "image/jpeg"
    const quality = 0.5
    const options = { type, quality, scale }

    const blob =
      engine === "modern-screenshot"
        ? await domToBlob(obj.current, { ...options })
        : engine === "html2image"
          ? await html2image.toBlob(obj.current, {
              backgroundColor: "transparent", // 好像没用。。。微信手机端还是有白色倒角。。
              pixelRatio: options.scale,
              ...options,
            })
          : await new Promise<Blob | null>(async (resolve, reject) => {
              if (!obj.current || !preview) return

              const canvas = await html2canvas(obj.current, { ...options })

              canvas.toBlob(
                (data) => {
                  console.log("blobCallback: ", data)
                  resolve(data)
                },
                options.type,
                options.quality,
              )
            })
    if (!blob) {
      console.error(`no blob`)
      return
    }

    switch (actionType) {
      case "copy":
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ])
        toast.success("copied image to clipboard")
        break

      case "download":
        const fileName = handleDownload({
          blob,
          // fileName // todo: name
        })
        toast.success(`downloaded at ${fileName}`, { closeButton: true })
        break

      case "upload":
        if (!oss) return
        const file = new File([blob], oss.key, {
          type: blob.type,
        })
        await uploadFile(file)

        await updateOssUrl(oss.id, oss.url)
        toast.success(`uploaded at ${oss.url}`, {
          closeButton: true,
        })
    }
  }

  return <GeneralCardAction action={action} type={type} disabled={!rendered} />
}
