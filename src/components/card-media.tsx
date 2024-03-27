import Image from "next/image"
import ReactPlayer from "react-player"
import { BilibiliVideo } from "../../packages/common-bilibili/component"
import { CardType } from "../app/(sub)/card/gen/store"
import { IMedia } from "../schema/card"

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

    case "text-iframe":
      return (
        // todo: more iframe
        <BilibiliVideo video={{ url, height, width }} />
      )
  }
}
