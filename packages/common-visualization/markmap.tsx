"use client"

import { cardMindmapRenderedAtom } from "@/store/card.atom"
import { useAtom, useSetAtom } from "jotai"
import { Transformer } from "markmap-lib"
import { Markmap } from "markmap-view"
import { useEffect, useRef, useState } from "react"
import { AspectRatio } from "../common-ui-shadcn/components/aspect-ratio"
import { mapSpacingVerticalAtom } from "./store"

const transformer = new Transformer()

export default function MarkMap({ content }: { content?: string }) {
  const refSvg = useRef<SVGSVGElement>(null)
  const refMm = useRef<Markmap>()

  // 不能设置 ratio 为 0，否则会导致 svg 渲染算法出错
  const [ratio, setRatio] = useState(1)
  const setCardRendered = useSetAtom(cardMindmapRenderedAtom)
  const [spacingVertical] = useAtom(mapSpacingVerticalAtom)

  useEffect(() => {
    if (!refSvg.current || !content) return

    const mm = Markmap.create(refSvg.current, {
      pan: false,
      spacingVertical,
      zoom: false,
      maxWidth: 200,
      duration: 0, // 这样就不用检测动画了
      initialExpandLevel: 3,
      autoFit: true,
    })
    refMm.current = mm

    const { root } = transformer.transform(content, {})
    // console.log({ root })
    root.content = "" // 去掉首结点的内容
    mm.setData(root)
    mm.state.minY = 20 // 首结点紧贴边缘

    // ref: https://github.com/markmap/markmap/issues/134#issuecomment-1267967814
    const { maxY, maxX, minX, minY } = mm.state
    const w = maxY - minY
    const h = maxX - minX
    const ratio = w / h
    setRatio(ratio)

    return () => {
      mm.destroy()
    }
  }, [spacingVertical, content])

  // /**
  //  * 当填充数据，并且初始化了ratio之后，才要 fit
  //  */
  // useEffect(() => {
  //   if (content) {
  //     setCardRendered(false)
  //     void refMm.current?.fit().then(() => {
  //       setCardRendered(true)
  //     })
  //   }
  // }, [ratio, content])

  console.log("-- markmap: ", { content, ratio, state: refMm.current?.state })

  return (
    <div className={"w-full"}>
      <AspectRatio ratio={ratio}>
        <svg className="w-full h-full" ref={refSvg} />
      </AspectRatio>
    </div>
  )
}
