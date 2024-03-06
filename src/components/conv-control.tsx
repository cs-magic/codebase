"use client"

import { ConvRequestsSlider } from "./conv-requests-slider"

export const ConvControl = () => {
  return (
    <div className={"m-2 flex items-center gap-4"}>
      <ConvRequestsSlider />
    </div>
  )
}
