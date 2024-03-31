"use client"

import { cardRenderStatusAtom } from "@/store/card.atom"
import { useSetAtom } from "jotai"
import { Transformer } from "markmap-lib"
import { Markmap } from "markmap-view"
import { useEffect, useRef, useState } from "react"
import { AspectRatio } from "../common-ui-shadcn/components/aspect-ratio"

const transformer = new Transformer()

const transformContent = (content: string): string => {
  return content
    .split(/\n/g)
    .map((s) => {
      const N = 15
      if (s.length > N) return s.slice(0, N) + "……"
      return s
    })
    .join("\n")
}

export default function MarkMap({ content }: { content: string }) {
  // Ref for SVG element
  const refSvg = useRef<SVGSVGElement>(null)
  // Ref for markmap object
  const refMm = useRef<Markmap>()
  const [ratio, setRatio] = useState(0)
  const setCardRenderStatus = useSetAtom(cardRenderStatusAtom)

  const contentTransformed = transformContent(content)

  useEffect(() => {
    if (!refSvg.current) return
    // Create markmap and save to refMm
    const mm = Markmap.create(refSvg.current)
    // console.log({ mm })
    refMm.current = mm
    return () => {
      mm.destroy()
      setCardRenderStatus("default")
    }
  }, [refSvg.current])

  useEffect(() => {
    setCardRenderStatus("renderingMindmap")
    // Update data for markmap once value is changed
    const mm = refMm.current
    if (!mm) return
    const { root } = transformer.transform(contentTransformed, {})
    mm.setData(root)

    // ref: https://github.com/markmap/markmap/issues/134#issuecomment-1267967814
    const { maxY, maxX, minX, minY } = mm.state
    const w = maxY - minY
    const h = maxX - minX
    const ratio = w / h
    setRatio(ratio)
  }, [refMm.current, contentTransformed])

  useEffect(() => {
    if (!ratio || !refMm.current) return
    void refMm.current.fit().then(() => {
      setCardRenderStatus("renderedMindmap")
    })
  }, [ratio])

  return (
    <div className={"w-full"}>
      <AspectRatio ratio={ratio}>
        <svg className="w-full h-full" ref={refSvg} />
      </AspectRatio>
    </div>
  )
}
