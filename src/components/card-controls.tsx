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

import { config } from "../config/system"
import { genCardFromUrl } from "../core/gen-card"
import { ActionType } from "../schema/card"
import {
  cardAtom,
  cardAuthorWithTitleAtom,
  cardGenOptionsAtom,
  cardInputUrlAtom,
  cardOssIdAtom,
  cardRenderedAtom,
  cardUserAvatarAtom,
  cardUserNameAtom,
} from "../store/card.atom"
import { ActionButton } from "./card-action-button"
import { StandardCard } from "./standard-card"

export const CardControls = ({ obj }: { obj: RefObject<HTMLDivElement> }) => {
  const [inputUrl, setInputUrl] = useAtom(cardInputUrlAtom)
  const [cardUserAvatar, setCardUserAvatar] = useAtom(cardUserAvatarAtom)
  const [cardUserName, setCardUserName] = useAtom(cardUserNameAtom)
  const [rendered] = useAtom(cardRenderedAtom)
  const [cardOptions] = useAtom(cardGenOptionsAtom)
  const [card, setCard] = useAtom(cardAtom)
  const [cardOssId] = useAtom(cardOssIdAtom)
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )

  console.log("-- CardControls: inputUrl: ", inputUrl)

  const action = async (type: ActionType) => {
    console.log({ type })
    if (type === "generate") {
      setCard(null)
      const card = await genCardFromUrl(inputUrl, cardOptions)
      console.log("-- generated card: ", card)
      setCard(card)
      return
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
      <StandardCard title={"Input"} type={"beauty"}>
        <LabelLine title={"Url"}>
          <Input
            id={"card-input-url"}
            placeholder={config.card.genInputPlaceHolder}
            className={"grow"}
            value={inputUrl}
            onChange={(event) => {
              setInputUrl(event.currentTarget.value)
            }}
          />
        </LabelLine>

        <LabelLine title={"Name"}>
          <Input
            id={"card-user-name"}
            value={cardUserName}
            onChange={(event) => {
              setCardUserName(event.currentTarget.value)
            }}
          />
        </LabelLine>

        <LabelLine title={"Avatar"}>
          <Input
            id={"card-user-avatar"}
            value={cardUserAvatar}
            onChange={(event) => {
              setCardUserAvatar(event.currentTarget.value)
            }}
          />
        </LabelLine>
      </StandardCard>

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
          <ActionButton action={action} type={"generate"} />
          <ActionButton action={action} type={"copy"} disabled={!rendered} />
          <ActionButton
            action={action}
            type={"download"}
            disabled={!rendered}
          />
          <ActionButton action={action} type={"upload"} disabled={!rendered} />
        </div>
      </StandardCard>
    </div>
  )
}
