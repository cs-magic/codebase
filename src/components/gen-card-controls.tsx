"use client"

import download from "downloadjs"
import * as html2image from "html-to-image"
import { useAtom } from "jotai"
import { RefObject } from "react"
import { toast } from "sonner"
import { uploadFile } from "../../packages/common-oss/upload"
import { getOssUrl } from "../../packages/common-oss/utils"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { AtomSwitcher } from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { mapSpacingVerticalAtom } from "../../packages/common-visualization/store"
import { genCardFromUrl } from "../core/gen-card"
import { ActionType } from "../schema/card"
import {
  cardAtom,
  cardAuthorWithTitleAtom,
  cardGenOptionsAtom,
  cardInputUrlAtom,
  cardOssIdAtom,
  cardRenderedAtom,
} from "../store/card.atom"

import { GenCardActionButton } from "./gen-card-action-button"
import { GenCardInputUrl } from "./gen-card-input-url"
import { GenCardInputUser } from "./gen-card-input-user"
import { StandardCard } from "./standard-card"

export const GenCardControls = ({
  obj,
}: {
  obj: RefObject<HTMLDivElement>
}) => {
  const [inputUrl] = useAtom(cardInputUrlAtom)
  const [rendered] = useAtom(cardRenderedAtom)
  const [cardOptions] = useAtom(cardGenOptionsAtom)
  const [card, setCard] = useAtom(cardAtom)
  const [cardOssId] = useAtom(cardOssIdAtom)
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )

  const action = async (type: ActionType) => {
    console.log({ type })
    if (type === "generate") {
      setCard(null)
      genCardFromUrl(inputUrl, cardOptions)
        .then(setCard)
        .catch((err) => toast.error((err as unknown as Error).message))
    }

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
    <div className={"w-full p-2 flex flex-col"}>
      <GenCardInputUrl />

      <GenCardInputUser />

      <StandardCard title={"Generate"} type={"beauty"}>
        {/*{cardControls.map((item, index) => (*/}
        {/*  <AtomSwitcher {...item} key={index} />*/}
        {/*))}*/}
      </StandardCard>

      <StandardCard title={"Display"} type={"beauty"}>
        <AtomSwitcher
          atom={cardAuthorWithTitleAtom}
          name={"Author With Title"}
        />
        <LabelLine title={"Map Vertical Space"}>
          <Input
            type={"number"}
            value={mapSpacingVertical ?? 0}
            onChange={(event) => {
              setMapSpacingVertical(Number(event.currentTarget.value))
            }}
          />
        </LabelLine>
      </StandardCard>

      <StandardCard title={"Actions"} type={"beauty"}>
        <div className={"flex gap-2"}>
          <GenCardActionButton action={action} type={"generate"} />
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
      </StandardCard>
    </div>
  )
}
