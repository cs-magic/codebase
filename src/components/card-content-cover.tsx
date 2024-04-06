import { useSetAtom } from "jotai"
import Image from "next/image"
import { useEffect } from "react"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { IMedia } from "../schema/card"
import { cardCoverRenderedAtom } from "../store/card.atom"

export const Cover = ({ cover }: { cover?: IMedia }) => {
  const setCardCoverRendered = useSetAtom(cardCoverRenderedAtom)

  useEffect(() => {
    console.log("-- src changed")
    setCardCoverRendered(false)
  }, [cover?.url])

  if (!cover) return null

  return (
    <div id={"card-media"} className={"w-full shrink-0"}>
      <AspectRatio ratio={cover?.ratio ?? 2.35}>
        {/*  公众号不能用 img，会显示此图片来自微信公众平台，未经允许不可引用 */}
        <Image
          onLoad={() => {
            console.log("-- cover loaded")
            setCardCoverRendered(true)
          }}
          src={cover.url}
          alt={""}
          fill
          className={"object-cover "}
          sizes={"367px"}
        />
      </AspectRatio>
    </div>
  )
}
