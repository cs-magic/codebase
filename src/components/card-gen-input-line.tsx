"use client"

import { useAtom, useSetAtom } from "jotai"
import { toast } from "sonner"
import { Button } from "../../packages/common-ui-shadcn/components/button"
import { Input } from "../../packages/common-ui-shadcn/components/input"

import {
  cardContentAtom,
  cardIFramesAtom,
  cardImagesAtom,
  cardVideosAtom,
  platformTypeAtom,
  urlToParseAtom,
} from "../store/card.atom"
import { url2card } from "../utils/parse-card"

export const InputLine = () => {
  const [inputUrl, setInputUrl] = useAtom(urlToParseAtom)
  const setPlatformType = useSetAtom(platformTypeAtom)
  const setContent = useSetAtom(cardContentAtom)
  const setImages = useSetAtom(cardImagesAtom)
  const setVideos = useSetAtom(cardVideosAtom)
  const setIFrames = useSetAtom(cardIFramesAtom)

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
          const card = await url2card(inputUrl)
          console.log("-- parsed card: ", card)
          if (!card.data || !card.success) return toast.error(card.message)

          const { iFrames, videos, content, images, platform, sourceUrl } =
            card.data

          if (platform) setPlatformType(platform)
          if (content) setContent(content)
          if (images) setImages(images)
          if (videos) setVideos(videos)
          if (iFrames) setIFrames(iFrames)
        }}
      >
        Generate
      </Button>
    </div>
  )
}
