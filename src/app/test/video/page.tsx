"use client"

import { Player } from "video-react"
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container"
import { ReactPlayerNoSSR, VideoReactNoSSR } from "../../../components/video"

const videoUrl =
  "https://sns-video-al.xhscdn.com/stream/110/259/01e5f031772b1784010370038e32417132_259.mp4"
// const videoUrl = "/demo.mp4"

export default function TestVideoPage() {
  return (
    <FlexContainer>
      {/*<ReactPlayerNoSSR url={videoUrl} controls />*/}

      <video width="640" height="480" controls preload="auto" src={videoUrl}>
        {/*<source src={videoUrl} type="video/mp4" />*/}
      </video>
    </FlexContainer>
  )
}
