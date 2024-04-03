"use client"

import { cardGeneratingAtom, cardRenderedAtom } from "@/store/card.atom"
import { useAtom } from "jotai"
import { Transformer } from "markmap-lib"
import { Markmap } from "markmap-view"
import { useEffect, useRef, useState } from "react"
import { truncateString } from "../common-algo/string"
import { AspectRatio } from "../common-ui-shadcn/components/aspect-ratio"

const transformer = new Transformer()

const transformContent = (content?: string): string => {
  return (content ?? "")
    .split(/\n/g)
    .map((s) => {
      return truncateString(s, 30)
    })
    .join("\n")
}

export default function MarkMap({ content }: { content?: string }) {
  // Ref for SVG element
  const refSvg = useRef<SVGSVGElement>(null)
  // Ref for markmap object
  const refMm = useRef<Markmap>()

  const [ratio, setRatio] = useState(0)
  const [rendered, setCardRendered] = useAtom(cardRenderedAtom)

  useEffect(() => {
    if (!refSvg.current || !content) return

    const mm = Markmap.create(refSvg.current, {
      pan: false,
      // scrollForPan: false,
      zoom: false,
    })
    refMm.current = mm

    const { root } = transformer.transform(transformContent(content), {})
    mm.setData(root)

    // ref: https://github.com/markmap/markmap/issues/134#issuecomment-1267967814
    const { maxY, maxX, minX, minY } = mm.state
    const w = maxY - minY
    const h = maxX - minX
    const ratio = w / h
    setRatio(ratio)
    return () => {
      mm.destroy()
    }
  }, [content])

  /**
   * 当填充数据，并且初始化了ratio之后，才要 fit
   */
  useEffect(() => {
    if (ratio && content) {
      void refMm.current?.fit().then(() => {
        console.log("-- rendered")
        setCardRendered(true)
      })
    }
    return () => {
      setCardRendered(false)
    }
  }, [ratio, content])

  // console.log({ content, ratio, rendered })

  return (
    <div className={"w-full"}>
      <AspectRatio ratio={ratio}>
        <svg className="w-full h-full" ref={refSvg} />
      </AspectRatio>
    </div>
  )
}
