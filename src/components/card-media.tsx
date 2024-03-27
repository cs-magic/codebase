import Image from "next/image"
import ReactPlayer from "react-player"
import { toast } from "sonner"
import { BilibiliVideo } from "../../packages/common-bilibili/component"
import { getBvidFromUrl } from "../../packages/common-bilibili/utils"
import { CardType, IMedia } from "../schema/card"

export const CardMedia = ({
  width,
  height,
  url,
  type,
}: {
  type: CardType
} & IMedia) => {
  console.log("-- card media: ", { type, url, width, height })

  switch (type) {
    case "text-image":
      return <Image src={url} alt={""} fill className={"w-full h-auto"} />

    case "text-video":
      return (
        <ReactPlayer
          // playing
          // controls
          url={url}
          width={width}
          height={height}
        />
      )

    // todo: more iframe
    case "text-iframe":
      const bvid = getBvidFromUrl(url)
      if (!bvid) {
        toast.error(`no bvid parsed from url: ${url}`)
        return
      }
      return <BilibiliVideo video={{ bvid, height, width }} />
  }
}
