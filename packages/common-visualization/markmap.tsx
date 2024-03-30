"use client"

import { useEffect, useRef } from "react"
import { Markmap } from "markmap-view"
import { Transformer } from "markmap-lib"

const transformer = new Transformer()

export default function MarkMap({ content }: { content: string }) {
  // Ref for SVG element
  const refSvg = useRef<SVGSVGElement>(null)
  // Ref for markmap object
  const refMm = useRef<Markmap>()

  useEffect(() => {
    if (!refSvg.current) return
    // Create markmap and save to refMm
    const mm = Markmap.create(refSvg.current)
    // console.log({ mm })
    refMm.current = mm
    return () => {
      mm.destroy()
    }
  }, [refSvg.current])

  useEffect(() => {
    // Update data for markmap once value is changed
    const mm = refMm.current
    if (!mm) return
    const { root } = transformer.transform(content)
    mm.setData(root)
    mm.fit()
  }, [refMm.current, content])

  return <svg className="w-full h-full" ref={refSvg} />
}
