"use client"

import { produce } from "immer"
import { useAtom } from "jotai"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { getBilibiliDetail } from "../../../../../packages/common-bilibili/actions-client"
import {
  getBilibiliIFrameUrl,
  getBvidFromUrl,
} from "../../../../../packages/common-bilibili/utils"
import { Button } from "../../../../../packages/common-ui-shadcn/components/button"
import { Input } from "../../../../../packages/common-ui-shadcn/components/input"
import { Label } from "../../../../../packages/common-ui-shadcn/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../packages/common-ui-shadcn/components/select"
import { Switch } from "../../../../../packages/common-ui-shadcn/components/switch"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Card, CardType, ICard } from "../../../../components/card"
import { useUserSummary } from "../../../../hooks/use-user-summary"
import {
  bilibiliContentAtom,
  bilibiliCoverUrlAtom,
  bilibiliIFrameUrlAtom,
  bilibiliVideoControlEnabledAtom,
  cardTypeAtom,
  SourceType,
  sourceTypeAtom,
  urlToParseAtom,
} from "./store"

export default function GenCardPage() {
  const user = useUserSummary()
  const [urlToParse, setUrlToParse] = useAtom(urlToParseAtom)
  const [sourceType, setSourceType] = useAtom(sourceTypeAtom)
  const [cardType, setCardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled, setBilibiliVideoControlEnabled] = useAtom(
    bilibiliVideoControlEnabledAtom,
  )
  const [bilibiliIFrameUrl, setBilibiliIFrameUrl] = useAtom(
    bilibiliIFrameUrlAtom,
  )
  const [bilibiliCoverUrl, setBilibiliCoverUrl] = useAtom(bilibiliCoverUrlAtom)
  const [bilibiliContent, setBilibiliContent] = useAtom(bilibiliContentAtom)

  const card: ICard = {
    user: user ?? undefined,
    updatedAt: new Date(),
    content: bilibiliContent,
    resourceUrl:
      cardType === "text-video"
        ? bilibiliIFrameUrl
        : cardType === "text-image"
          ? bilibiliCoverUrl
          : "",
    type: cardType,
  }

  return (
    <FlexContainer orientation={"vertical"}>
      <div className={"w-full flex items-center gap-4"}>
        <Input
          className={"grow"}
          value={urlToParse}
          onChange={(event) => {
            setUrlToParse(event.currentTarget.value)
          }}
        />

        <Select
          value={sourceType}
          onValueChange={(v) => setSourceType(v as SourceType)}
        >
          <SelectTrigger className={"w-fit"}>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value={"bilibili"}>Bilibili</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={async () => {
            if (sourceType === "bilibili") {
              const bvid = getBvidFromUrl(urlToParse)
              if (!bvid) return toast.error("invalid bilibili url")
              const bilibiliDetail = await getBilibiliDetail(bvid)
              setBilibiliCoverUrl(bilibiliDetail.View.pic)
              setBilibiliIFrameUrl(getBilibiliIFrameUrl({ url: urlToParse }))
              setBilibiliContent(bilibiliDetail.View.desc)
            }
          }}
        >
          Generate
        </Button>
      </div>

      <div className={"flex items-center gap-2"}>
        <Label className={"shrink-0"}>Display Type</Label>
        <Select
          value={cardType}
          onValueChange={(v) => setCardType(v as CardType)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value={"text-image" as CardType}>
                Text with Image
              </SelectItem>
              <SelectItem value={"text-video" as CardType}>
                Text with Video
              </SelectItem>
              <SelectItem value={"text" as CardType} disabled>
                Plain Text (todo)
              </SelectItem>
              <SelectItem value={"text-gif" as CardType} disabled>
                Text with GIF (todo)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {cardType === "text-video" && (
          <>
            <Label className={"shrink-0"}>Show Video Controls</Label>
            <Switch
              checked={bilibiliVideoControlEnabled}
              onCheckedChange={setBilibiliVideoControlEnabled}
            />
          </>
        )}
      </div>

      {!card ? (
        "You should login first."
      ) : (
        <Card
          style={{
            width: bilibiliVideoControlEnabled ? 420 : 419,
          }}
          card={card}
        />
      )}
    </FlexContainer>
  )
}
