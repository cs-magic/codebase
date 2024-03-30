import Image from "next/image"
import ReactPlayer from "react-player"
import { toast } from "sonner"
import { BilibiliVideo } from "../../packages/common-bilibili/component"
import { getBvidFromUrl } from "../../packages/common-bilibili/utils"
import { CardType, IMedia } from "../schema/card"

export const CardMedia = ({
  cardType,
  media,
}: {
  cardType: CardType
  media: IMedia
}) => {
  console.log("-- card media: ", { cardType, media })

  const { url, dimension } = media

  switch (cardType) {
    case "text-image":
      return <Image src={url} alt={""} fill className={"w-full h-auto"} />

    case "text-video":
      return (
        <ReactPlayer
          // playing
          // controls
          url={url}
          width={dimension?.width}
          height={dimension?.height}
        />
      )

    // todo: more iframe
    case "text-iframe":
      const bvid = getBvidFromUrl(url)
      if (!bvid) {
        toast.error(`no bvid parsed from url: ${url}`)
        return null
      }
      return <BilibiliVideo video={{ bvid, dimension }} />
  }
}
