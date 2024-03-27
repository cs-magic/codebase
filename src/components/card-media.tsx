import Image from "next/image"
import ReactPlayer from "react-player"
import { BilibiliVideo } from "../../packages/common-bilibili/component"
import { CardType } from "../app/(sub)/card/gen/store"
import { IMedia } from "../schema/card"

export const CardMedia = ({
  media,
  type,
}: {
  media: IMedia
  type: CardType
}) => {
  switch (type) {
    case "text-image":
      return <Image src={media.url} alt={""} fill className={"w-full h-auto"} />

    case "text-video":
      return (
        <ReactPlayer
          // playing
          controls
          url={media.url}
          width={media.width}
          height={media.height}
        />
      )

    case "text-iframe":
      return (
        // todo: more iframe
        <BilibiliVideo
          video={{ url: media.url, height: media.height, width: media.width }}
        />
      )
  }
}
