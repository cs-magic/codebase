import { toast } from "sonner"
import { getBilibiliDetail } from "../../packages/common-bilibili/actions-client"
import {
  getBilibiliIFrameUrl,
  getBvidFromUrl,
} from "../../packages/common-bilibili/utils"
import { Button } from "../../packages/common-ui-shadcn/components/button"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { parseXiaoHongShuPage } from "../../packages/common-xiaohongshu/actions"
import {
  cardContentAtom,
  cardIFramesAtom,
  cardImagesAtom,
  cardVideosAtom,
  sourceTypeAtom,
  urlToParseAtom,
} from "../app/(sub)/card/gen/store"
import { extractFirstURL } from "../app/(sub)/card/gen/utils"

export const InputLine = () => {
  const [inputUrl, setInputUrl] = useAtom(urlToParseAtom)
  const [, setSourceType] = useAtom(sourceTypeAtom)
  const [, setIFrames] = useAtom(cardIFramesAtom)
  const [, setVideos] = useAtom(cardVideosAtom)
  const [, setImages] = useAtom(cardImagesAtom)
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
            const { content, images, videos } =
              await parseXiaoHongShuPage(urlParsed)
            if (content) setContent(content)
            if (images) setImages(images)
            if (videos) setVideos(videos)
          } else if (/bilibili/.test(urlParsed)) {
            // 哔哩哔哩
            setSourceType("bilibili")
            const bvid = getBvidFromUrl(urlParsed)
            if (!bvid) return toast.error("invalid bilibili url")
            const bilibiliDetail = await getBilibiliDetail(bvid)
            setImages([{ url: bilibiliDetail.View.pic, width: 0, height: 0 }])
            setIFrames([
              {
                url: getBilibiliIFrameUrl({ url: urlParsed }),
                width: 0,
                height: 0,
              },
            ])
            setContent(bilibiliDetail.View.desc)
          }
        }}
      >
        Generate
      </Button>
    </div>
  )
}
