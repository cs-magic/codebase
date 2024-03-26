"use client"

import { useAtom } from "jotai"
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
import { parseXiaoHongShuPage } from "../../../../../packages/common-xiaohongshu/actions"
import { Card, CardType, ICard } from "../../../../components/card"
import { useUserSummary } from "../../../../hooks/use-user-summary"
import {
  bilibiliIFrameUrlAtom,
  bilibiliVideoControlEnabledAtom,
  cardContentAtom,
  cardCoverUrlAtom,
  cardTypeAtom,
  SourceType,
  sourceTypeAtom,
  urlToParseAtom,
} from "./store"

export default function GenCardPage() {
  const user = useUserSummary()
  const [cardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled] = useAtom(bilibiliVideoControlEnabledAtom)
  const [bilibiliIFrameUrl] = useAtom(bilibiliIFrameUrlAtom)
  const [cover] = useAtom(cardCoverUrlAtom)
  const [content] = useAtom(cardContentAtom)
  const [urlToParse] = useAtom(urlToParseAtom)

  const card: ICard = {
    user: user ?? undefined,
    updatedAt: new Date(),
    content,
    resourceUrl:
      cardType === "text-video"
        ? bilibiliIFrameUrl
        : cardType === "text-image"
          ? cover
          : "",
    type: cardType,
    sourceUrl: urlToParse,
  }

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto"}
    >
      <InputLine />

      <Controls />

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

const InputLine = () => {
  const [urlToParse, setUrlToParse] = useAtom(urlToParseAtom)
  const [sourceType, setSourceType] = useAtom(sourceTypeAtom)
  const [, setBilibiliIFrameUrl] = useAtom(bilibiliIFrameUrlAtom)
  const [, setCover] = useAtom(cardCoverUrlAtom)
  const [, setContent] = useAtom(cardContentAtom)

  return (
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
        <SelectTrigger className={"w-32"}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"bilibili" as SourceType}>哔哩哔哩</SelectItem>
            <SelectItem value={"xiaohongshu" as SourceType}>小红书</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={async () => {
          console.log("-- generating ...")

          switch (sourceType) {
            case "bilibili":
              const bvid = getBvidFromUrl(urlToParse)
              if (!bvid) return toast.error("invalid bilibili url")
              const bilibiliDetail = await getBilibiliDetail(bvid)
              setCover(bilibiliDetail.View.pic)
              setBilibiliIFrameUrl(getBilibiliIFrameUrl({ url: urlToParse }))
              setContent(bilibiliDetail.View.desc)
              break

            case "xiaohongshu":
              const data = await parseXiaoHongShuPage(urlToParse)
              setContent(`# ${data.title}\n\n${data.description}\n\n`)
              if (data.images.length) setCover(data.images[0]!)
              console.log({ content: data })
              break

            default:
              console.error("unexpected")
          }
        }}
      >
        Generate
      </Button>
    </div>
  )
}

const Controls = () => {
  const [cardType, setCardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled, setBilibiliVideoControlEnabled] = useAtom(
    bilibiliVideoControlEnabledAtom,
  )

  return (
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
  )
}
