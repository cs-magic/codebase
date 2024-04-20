"use client";

import { FlexContainer } from "../../../../../../packages/ui/components/flex-container";

const videoUrl = "/api/video-proxy";
// sampleXiaoHongShuVideoUrl
// sampleLocalVideoUrl

export default function TestVideoPage() {
  return (
    <FlexContainer>
      {/*<ReactPlayerNoSSR url={videoUrl} controls />*/}

      <video width="640" height="480" controls preload="auto" src={videoUrl} />
      {/*<source src={videoUrl} type="video/mp4" />*/}
    </FlexContainer>
  );
}
