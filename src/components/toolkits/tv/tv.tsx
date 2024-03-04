"use client"

import "@/components/toolkits/tv/tv.css"
import { AspectRatio } from "../../../../packages/common/components/ui/aspect-ratio"
import { forwardRef, HTMLAttributes } from "react"
import { cn } from "../../../../packages/common/lib/utils"
import { useMeasure } from "react-use"
import { useAtom } from "jotai"
import { uiScreenAtom } from "../../../../packages/common/store/ui"

/**
 * tv, ref: https://codepen.io/manz/pen/MWoRMja
 * @param className
 * @param props
 * @constructor
 */
export const TVInner = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const channelDeg = 0
  const volumeDeg = 0

  return (
    <div ref={ref} className={cn("container", className)} {...props}>
      <div className="tv">
        <div className="antenna-container">
          <div className="antenna"></div>
        </div>
        <div className="television-container">
          <div className="television">
            <div className="television-inner">
              <div className="television-screen-container">
                <div className="television-crt">
                  <div className="television-screen">
                    <div className="off"></div>
                    <div className="logo-container">
                      <div className="logo">
                        <div className="play"></div>
                      </div>
                      <div className="text">hello</div>
                    </div>
                    <div className="noise"></div>
                  </div>
                </div>
              </div>
              <div className="television-lateral">
                <div className="dial-container">
                  <div className="dial channel-button" style={{}}>
                    <div className="data-container">
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                    </div>
                    <div className="dial-core"></div>
                    <div className="selector"></div>
                  </div>
                  <div className="dial volume-button" style={{}}>
                    <div className="data-container">
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                      <div className="data">#</div>
                    </div>
                    <div className="dial-core"></div>
                    <div className="selector"></div>
                  </div>
                </div>
                <div className="speaker-container">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="buttons">
                <div className="button-container">
                  <div className="button"></div>
                </div>
                <div className="button-container">
                  <div className="button"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="television-base">
            <div className="slots">
              <div className="slot"></div>
              <div className="slot"></div>
              <div className="slot"></div>
            </div>
            <div className="slots">
              <div className="slot"></div>
              <div className="slot"></div>
              <div className="slot"></div>
              <div className="slot"></div>
              <div className="slot"></div>
              <div className="slot"></div>
            </div>
          </div>
          <div className="foot-container">
            <div className="foot left"></div>
            <div className="foot right"></div>
          </div>
        </div>
      </div>
    </div>
  )
})
TVInner.displayName = "TVInner"

export const TV = () => {
  const [{ width: w, height: h }] = useAtom(uiScreenAtom)

  // width height 短边除以2
  const targetWidth =
    w > h
      ? // pc
        h / 4
      : // mobile
        w / 2
  const tvWidth = 420
  const scale = targetWidth / tvWidth
  console.log({ w, h, targetWidth, tvWidth, scale })

  return (
    <div style={{ width: targetWidth }} className={"mx-auto"}>
      <AspectRatio ratio={1}>
        <div className={"w-full h-full flex items-center justify-center"}>
          <TVInner className={"origin-center"} style={{ scale }} />
        </div>
      </AspectRatio>
    </div>
  )
}
