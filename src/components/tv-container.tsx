"use client"
import { PropsWithChildren, useRef } from "react"
import { useAtom } from "jotai"
import { getTvScale, tvFullScreenAtom, tvScreenOnAtom } from "@/store/tv"
import { useFullscreen, useMeasure } from "react-use"
import { cn } from "../../packages/common/lib/utils"
import { FlexContainer } from "../../packages/common/components/flex-container"
import { range } from "lodash"
import { Controls } from "@/components/tv-controls"

import "@/styles/tv.css"

/**
 * tv, ref: https://codepen.io/manz/pen/MWoRMja
 */
export const TVContainer = ({ children }: PropsWithChildren) => {
  const [isScreenOn] = useAtom(tvScreenOnAtom)
  const [isFullScreen, setFullScreen] = useAtom(tvFullScreenAtom)

  const ref = useRef<HTMLDivElement>(null)
  useFullscreen(ref, isFullScreen, {
    onClose: () => setFullScreen(false),
  })

  const channelDeg = 0
  const volumeDeg = 0

  const [refViewport, viewport] = useMeasure<HTMLDivElement>()
  const scale = getTvScale(viewport)

  console.log({ scale, isScreenOn, isFullScreen })

  return (
    <div
      className={"w-full h-full flex items-center justify-center"}
      ref={refViewport}
    >
      <div
        className={cn(
          "tv",
          // 这里是反的
          !isScreenOn && "on",
          // "bg-cyan-800",
        )}
        style={{ scale }}
      >
        <div className="antenna-container">
          <div className="antenna"></div>
        </div>

        {/*  红色外框与脚 */}
        <div className="television-container">
          {/*  红色外框，不包含脚部分*/}
          <div className="television  ">
            {/*  不包含红色外框【目标】 */}
            <div
              className={cn("television-inner", isFullScreen && "!border-none")}
              ref={ref}
            >
              {/*  电视机屏幕容器 */}
              <div className="television-screen-container ">
                {/*  电视机外屏 */}
                <div className="television-crt">
                  {/*  电视机内屏 */}
                  <div className="television-screen ">
                    <div className="off"></div>

                    <FlexContainer className={"absolute"}>
                      {children}
                    </FlexContainer>

                    {/*<div className="logo-container">*/}
                    {/*  <div className="logo">*/}
                    {/*    <div className="play"></div>*/}
                    {/*  </div>*/}
                    {/*  <div className="text">hello</div>*/}
                    {/*</div>*/}

                    <div className="noise"></div>
                  </div>
                </div>
              </div>

              <div className="television-lateral">
                <div className="dial-container">
                  <div className="dial channel-button" style={{}}>
                    <div className="data-container">
                      {range(10).map((i) => (
                        <div key={i} className={"data"}>
                          #
                        </div>
                      ))}
                    </div>
                    <div className="dial-core"></div>
                    <div className="selector"></div>
                  </div>

                  <div className="dial volume-button" style={{}}>
                    <div className="data-container">
                      {range(10).map((i) => (
                        <div key={i} className={"data"}>
                          #
                        </div>
                      ))}
                    </div>
                    <div className="dial-core"></div>
                    <div className="selector"></div>
                  </div>
                </div>

                {/*  扬声器里的孔 */}
                <div className="speaker-container">
                  {range(6 * 8).map((i) => (
                    <div key={i} />
                  ))}
                </div>
              </div>

              <Controls />
            </div>
          </div>

          <div className="television-base ">
            <div className="slots">
              {range(6).map((i) => (
                <div key={i} className={"slot"}>
                  {""}
                </div>
              ))}
            </div>
            <div className="slots">
              {range(6).map((i) => (
                <div key={i} className={"slot"}>
                  {""}
                </div>
              ))}
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
}
