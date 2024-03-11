"use client"

import { ConvRequestsSlider } from "./conv-requests-slider"

export const ConvControl = () => {
  return (
    <div className={"hidden sm:flex m-2 items-center gap-4"}>
      <ConvRequestsSlider />
    </div>
  )
}
