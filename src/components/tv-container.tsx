"use client"
import { Controls } from "@/components/tv-controls"
import {
  getTvScale,
  tvFullScreenAtom,
  tvScreenOnAtom,
} from "../../packages/extend-tv/store"

import "@/styles/tv.css"
import { useAtom } from "jotai"
import { range } from "lodash"
import { PropsWithChildren, useRef } from "react"
import { useFullscreen, useMeasure } from "react-use"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"
import { cn } from "../../packages/common-ui/shadcn/utils"

/**
 * tv, ref: https://codepen.io/manz/pen/MWoRMja
 */
export const TVContainer = ({ children }: PropsWithChildren) => {
  const [isScreenOn] = useAtom(tvScreenOnAtom)
  const [isFullScreen, setFullScreen] = useAtom(tvFullScreenAtom)

  const refFullScreen = useRef<HTMLDivElement>(null)
  useFullscreen(refFullScreen, isFullScreen, {
    onClose: () => setFullScreen(false),
  })

  const channelDeg = 0
  const volumeDeg = 0

  const [refViewport, viewport] = useMeasure<HTMLDivElement>()
  const scale = getTvScale(viewport)

  // console.log({ scale, isScreenOn, isFullScreen })

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
            >
              {/*  电视机屏幕容器 */}
              <div className="television-screen-container ">
                {/*  电视机外屏 */}
                <div className="television-crt" ref={refFullScreen}>
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

              {/* 电视机侧部 */}
              <div className="television-lateral">
                <div className="dial-container ">
                  {/* 频道旋钮*/}
                  <div className="dial channel-button " style={{}}>
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

                  {/*  音量旋钮 */}
                  <div className="dial volume-button " style={{}}>
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
