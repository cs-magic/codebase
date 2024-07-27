"use client"

import { FlexContainer } from "@cs-magic/ui"

const videoUrl = "/api/video-proxy"

export default function TestVideoPage() {
  return (
    <FlexContainer>
      {/*<ReactPlayerNoSSR url={videoUrl} controls />*/}

      <video width="640" height="480" controls preload="auto" src={videoUrl} />
      {/*<source src={videoUrl} type="video/mp4" />*/}
    </FlexContainer>
  )
}
