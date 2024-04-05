import Image from "next/image"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { IMedia } from "../schema/card"

export const Cover = ({ cover }: { cover?: IMedia }) => {
  if (!cover) return null
  return (
    <div id={"card-media"} className={"w-full shrink-0"}>
      <AspectRatio ratio={cover?.ratio ?? 2.35}>
        <Image
          src={cover.url}
          alt={""}
          fill
          className={"object-cover"}
          sizes={"367px"}
        />
      </AspectRatio>
    </div>
  )
}
