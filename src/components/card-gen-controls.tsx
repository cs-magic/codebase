"use client"

import download from "downloadjs"
import * as html2image from "html-to-image"
import { useAtom, useSetAtom, WritableAtom } from "jotai"
import { RESET } from "jotai/utils"
import { RefObject, useState } from "react"
import { toast } from "sonner"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { Switch } from "../../packages/common-ui-shadcn/components/switch"
import { Badge } from "../../packages/common-ui-shadcn/components/ui/badge"
import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"
import { LabelLine } from "../../packages/common-ui/components/label-line"
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

export const Controls = ({ obj }: { obj: RefObject<HTMLDivElement> }) => {
  const [inputUrl] = useAtom(cardInputUrlAtom)
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
    <div className={"flex flex-col"}>
      <FlexContainer orientation={"horizontal"}>
        <Label className={"text-primary-foreground text-lg font-medium"}>
          Card
        </Label>

        <ButtonWithLoading
          id={"generate-card"}
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

        <Badge id={"card-render-status"}>{cardRenderStatus}</Badge>

        <ButtonWithLoading
          id={"copy-card"}
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
          loading={downloading}
          onClick={async () => {
            setDownloading(true)
            await action("download")
            setDownloading(false)
          }}
        >
          Download
        </ButtonWithLoading>
      </FlexContainer>

      <div className={"grid grid-cols-3 p-2 gap-2"}>
        <AtomSwitcher atom={cardSummaryEnabledAtom} name={"Summary Enabled"} />

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

      <FlexContainer>
        <Label className={"text-primary-foreground text-lg font-medium"}>
          User
        </Label>
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
      </FlexContainer>
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
