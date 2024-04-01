"use client"

import download from "downloadjs"
import * as html2image from "html-to-image"
import { useAtom, useSetAtom, WritableAtom } from "jotai"
import { RESET } from "jotai/utils"
import { ComponentProps, RefObject, useState } from "react"
import { toast } from "sonner"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { Switch } from "../../packages/common-ui-shadcn/components/switch"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { GEN_CARD_INPUT_PLACEHOLDER } from "../config/card"
import { genCardFromUrl } from "../core/gen-card"
import {
  cardBodyAtom,
  cardCommentsCacheIgnoredAtom,
  cardCommentsEnabledAtom,
  cardGenOptionsAtom,
  cardInputUrlAtom,
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
  const [cardBody] = useAtom(cardBodyAtom)
  const setCardBody = useSetAtom(cardBodyAtom)

  const [generating, setGenerating] = useState(false)
  const [coping, setCoping] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const action = async (type: "copy" | "download") => {
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
        download(
          blob,
          `${encodeURI(cardBody?.title ?? new Date().toString())}.png`,
        )
        break
    }
  }

  return (
    <div className={"w-full p-2 flex flex-col"}>
      <StandardCard title={"Url"} type={"beauty"}>
        <Input
          id={"input-url"}
          placeholder={GEN_CARD_INPUT_PLACEHOLDER}
          className={"grow"}
          value={inputUrl}
          onChange={(event) => {
            setInputUrl(event.currentTarget.value)
          }}
        />
      </StandardCard>

      <StandardCard title={"User"} type={"beauty"}>
        <div className={"flex flex-col gap-4"}>
          <LabelLine title={"Avatar"}>
            <Input
              id={"user-avatar"}
              value={cardUserAvatar}
              onChange={(event) => {
                setCardUserAvatar(event.currentTarget.value)
              }}
            />
          </LabelLine>

          <LabelLine title={"Name"}>
            <Input
              id={"user-name"}
              value={cardUserName}
              onChange={(event) => {
                setCardUserName(event.currentTarget.value)
              }}
            />
          </LabelLine>
        </div>
      </StandardCard>

      <StandardCard title={"Control"} type={"beauty"}>
        <div className={"flex flex-col gap-4"}>
          <AtomSwitcher
            atom={cardSummaryEnabledAtom}
            name={"Summary Enabled"}
          />

          <AtomSwitcher atom={cardStatEnabledAtom} name={"Stat Enabled"} />

          <AtomSwitcher
            atom={cardCommentsEnabledAtom}
            name={"Comments Enabled"}
          />

          <AtomSwitcher
            atom={cardSummaryCacheIgnoredAtom}
            name={"Summary Cache Ignored"}
          />
          <AtomSwitcher
            atom={cardStatCacheIgnoredAtom}
            name={"Stat Cache Ignored"}
          />
          <AtomSwitcher
            atom={cardCommentsCacheIgnoredAtom}
            name={"Comments Cache Ignored"}
          />
        </div>
      </StandardCard>

      <StandardCard title={"Card"} type={"beauty"}>
        <div className={"flex flex-col gap-2"}>
          <span className={"mx-2 text-muted-foreground"}>
            status:
            <Label
              className={"text-primary-foreground mx-2"}
              id={"card-render-status"}
            >
              {cardRenderStatus}
            </Label>
          </span>

          <div className={"flex gap-2"}>
            <ButtonWithLoading
              id={"generate-card"}
              className={"w-24"}
              size={"sm"}
              loading={generating}
              onClick={() => {
                setGenerating(true)
                genCardFromUrl(inputUrl, cardOptions)
                  .then(setCardBody)
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
          </div>
        </div>
      </StandardCard>
    </div>
  )
}

type SetStateActionWithReset<Value> =
  | Value
  | typeof RESET
  | ((prev: Value) => Value | typeof RESET)

export const AtomSwitcher = ({
  atom,
  name,
}: {
  atom: WritableAtom<boolean, [SetStateActionWithReset<boolean>], void>
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
