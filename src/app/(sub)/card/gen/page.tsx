"use client"

import { toBlob } from "html-to-image"
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
import { ButtonWithLoading } from "../../../../../packages/common-ui/components/button-with-loading"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { parseXiaoHongShuPage } from "../../../../../packages/common-xiaohongshu/actions"
import { Card, ICard } from "../../../../components/card"
import { useUserSummary } from "../../../../hooks/use-user-summary"
import {
  bilibiliVideoControlEnabledAtom,
  cardContentAtom,
  cardCoverUrlAtom,
  cardIFrameUrlAtom,
  CardType,
  cardTypeAtom,
  cardVideoAtom,
  sourceTypeAtom,
  urlParsedAtom,
  urlToParseAtom,
} from "./store"
import { extractFirstURL } from "./utils"

export default function GenCardPage() {
  const [cardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled] = useAtom(bilibiliVideoControlEnabledAtom)
  const [iFrameUrl] = useAtom(cardIFrameUrlAtom)
  const [videoUrl] = useAtom(cardVideoAtom)
  const [cover] = useAtom(cardCoverUrlAtom)
  const [content] = useAtom(cardContentAtom)
  const [urlParsed] = useAtom(urlParsedAtom)
  const [sourceType] = useAtom(sourceTypeAtom)

  const user = useUserSummary()
  const refCard = useRef<HTMLDivElement>(null)

  const card: ICard = {
    user: user ?? undefined,
    updatedAt: new Date(),
    content,
    resourceUrl:
      cardType === "text-iframe"
        ? iFrameUrl
        : cardType === "text-video"
          ? videoUrl
          : cardType === "text-image"
            ? cover
            : "",
    type: cardType,
    sourceUrl: urlParsed,
    coverRatio: sourceType === "xiaohongshu" ? 3 / 4 : 16 / 9,
  }

  const copyCard = async () => {
    if (!refCard.current) return console.error("no refCard current")

    const blob = await toBlob(refCard.current, {
      pixelRatio: 4 /* 这个因子非常重要，否则低端浏览器图片会很糊 */,
      backgroundColor: "transparent", // 好像没用。。。微信手机端还是有白色倒角。。
    })

    if (!blob) return

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ])
    toast.success("copied image to clipboard")
  }

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto"}
    >
      <InputLine />

      <Controls copyCard={copyCard} />

      {!card ? (
        "You should login first."
      ) : (
        <Card
          ref={refCard}
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
  const [inputUrl, setInputUrl] = useAtom(urlToParseAtom)
  const [, setSourceType] = useAtom(sourceTypeAtom)
  const [, setIFrameUrl] = useAtom(cardIFrameUrlAtom)
  const [, setVideoUrl] = useAtom(cardVideoAtom)
  const [, setCover] = useAtom(cardCoverUrlAtom)
  const [, setContent] = useAtom(cardContentAtom)

  return (
    <div className={"w-full flex items-center gap-4"}>
      <Input
        placeholder={"支持小红书、Bilibili……"}
        className={"grow"}
        value={inputUrl}
        onChange={(event) => {
          setInputUrl(event.currentTarget.value)
        }}
      />

      <Button
        onClick={async () => {
          const urlParsed = extractFirstURL(inputUrl)
          console.log({ urlParsed })
          if (!urlParsed) return

          console.log("-- generating ...")
          if (/xhslink|xiaohongshu/.test(urlParsed)) {
            // 小红书
            setSourceType("xiaohongshu")
            const data = await parseXiaoHongShuPage(urlParsed)
            setContent(`# ${data.title}\n\n${data.description}\n\n`)
            if (data.video) setVideoUrl(`/api/video-proxy?url=${data.video}`)
            if (data.images.length) setCover(data.images[0]!)
            console.log({ content: data })
          } else if (/bilibili/.test(urlParsed)) {
            // 哔哩哔哩
            setSourceType("bilibili")
            const bvid = getBvidFromUrl(urlParsed)
            if (!bvid) return toast.error("invalid bilibili url")
            const bilibiliDetail = await getBilibiliDetail(bvid)
            setCover(bilibiliDetail.View.pic)
            setIFrameUrl(getBilibiliIFrameUrl({ url: urlParsed }))
            setContent(bilibiliDetail.View.desc)
          }
        }}
      >
        Generate
      </Button>
    </div>
  )
}

const Controls = ({ copyCard }: { copyCard: () => Promise<void> }) => {
  const [cardType, setCardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled, setBilibiliVideoControlEnabled] = useAtom(
    bilibiliVideoControlEnabledAtom,
  )
  const [coping, setCoping] = useState(false)
  const [sourceType] = useAtom(sourceTypeAtom)

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

      <ButtonWithLoading
        loading={coping}
        onClick={async () => {
          setCoping(true)
          await copyCard()
          setCoping(false)
        }}
      >
        Copy Card
      </ButtonWithLoading>
    </div>
  )
}
