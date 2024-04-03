"use client"

import download from "downloadjs"
import * as html2image from "html-to-image"
import { useAtom } from "jotai"
import { RefObject, useState } from "react"
import { toast } from "sonner"
import { uploadFile } from "../../packages/common-oss/upload"
import { getOssUrl } from "../../packages/common-oss/utils"
import { Atom } from "../../packages/common-state-management/jotai/types"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { Switch } from "../../packages/common-ui-shadcn/components/switch"
import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import { LabelLine } from "../../packages/common-ui/components/label-line"

import { config } from "../config/system"
import { genCardFromUrl } from "../core/gen-card"
import {
  cardAtom,
  cardAuthorWithTitleAtom,
  cardCommentsCacheIgnoredAtom,
  cardCommentsEnabledAtom,
  cardGenOptionsAtom,
  cardInputUrlAtom,
  cardOssIdAtom,
  cardRenderStatusAtom,
  cardStatCacheIgnoredAtom,
  cardStatEnabledAtom,
  cardSummaryCacheIgnoredAtom,
  cardSummaryEnabledAtom,
  cardUserAvatarAtom,
  cardUserNameAtom,
} from "../store/card.atom"
import { StandardCard } from "./standard-card"

export const Controls = ({ obj }: { obj: RefObject<HTMLDivElement> }) => {
  const [inputUrl, setInputUrl] = useAtom(cardInputUrlAtom)
  const [cardUserAvatar, setCardUserAvatar] = useAtom(cardUserAvatarAtom)
  const [cardUserName, setCardUserName] = useAtom(cardUserNameAtom)
  const [cardOptions] = useAtom(cardGenOptionsAtom)
  const [cardRenderStatus] = useAtom(cardRenderStatusAtom)
  const [card, setCard] = useAtom(cardAtom)
  const [cardOssId] = useAtom(cardOssIdAtom)

  const [generating, setGenerating] = useState(false)
  const [coping, setCoping] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const action = async (type: "copy" | "download" | "upload") => {
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
        <AtomSwitcher atom={cardSummaryEnabledAtom} name={"Summary Enabled"} />

        <AtomSwitcher
          atom={cardSummaryCacheIgnoredAtom}
          name={"Summary Cache Ignored"}
        />

        <AtomSwitcher atom={cardStatEnabledAtom} name={"Stat Enabled"} />

        <AtomSwitcher
          atom={cardStatCacheIgnoredAtom}
          name={"Stat Cache Ignored"}
        />

        <AtomSwitcher
          atom={cardCommentsEnabledAtom}
          name={"Comments Enabled"}
        />

        <AtomSwitcher
          atom={cardCommentsCacheIgnoredAtom}
          name={"Comments Cache Ignored"}
        />
      </StandardCard>

      <StandardCard title={"Display"} type={"beauty"}>
        <AtomSwitcher
          atom={cardAuthorWithTitleAtom}
          name={"Author With Title"}
        />
      </StandardCard>

      <StandardCard title={"Actions"} type={"beauty"}>
        <LabelLine title={"status"}>
          <Label
            className={"text-primary-foreground mx-2"}
            id={"card-render-status"}
          >
            {cardRenderStatus}
          </Label>
        </LabelLine>

        <div className={"flex gap-2"}>
          <ButtonWithLoading
            id={"generate-card"}
            className={"w-24"}
            size={"sm"}
            loading={generating}
            onClick={() => {
              setGenerating(true)
              genCardFromUrl(inputUrl, cardOptions)
                .then(setCard)
                .catch((e) => {
                  console.error(e)
                  if ("message" in e) toast.error(e.message as string)
                })
                .finally(() => {
                  setGenerating(false)
                })
            }}
          >
            Generate
          </ButtonWithLoading>

          <ButtonWithLoading
            id={"copy-card"}
            className={"w-24"}
            size={"sm"}
            loading={coping}
            onClick={async () => {
              setCoping(true)
              await action("copy")
              setCoping(false)
            }}
          >
            Copy
          </ButtonWithLoading>

          <ButtonWithLoading
            id={"download-card"}
            className={"w-24"}
            size={"sm"}
            loading={downloading}
            onClick={async () => {
              setDownloading(true)
              await action("download")
              setDownloading(false)
            }}
          >
            Download
          </ButtonWithLoading>

          <ButtonWithLoading
            id={"upload-card"}
            className={"w-24"}
            size={"sm"}
            loading={uploading}
            onClick={async () => {
              setUploading(true)
              await action("upload")
              setUploading(false)
            }}
          >
            Upload
          </ButtonWithLoading>

          <ButtonWithLoading
            id={"clean-card"}
            className={"w-24"}
            size={"sm"}
            loading={uploading}
            onClick={async () => {
              setUploading(true)
              await action("upload")
              setUploading(false)
            }}
          >
            Clean
          </ButtonWithLoading>
        </div>
      </StandardCard>
    </div>
  )
}


export const AtomSwitcher = ({
  atom,
  name,
}: {
  atom: Atom<boolean>
  name: string
}) => {
  const [v, setV] = useAtom(atom)

  return (
    <div className={"flex items-center gap-2 justify-between"}>
      <Label className={"shrink-0"}>{name}</Label>
      <Switch checked={v} onCheckedChange={setV} />
    </div>
  )
}
