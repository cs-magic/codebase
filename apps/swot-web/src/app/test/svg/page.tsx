"use client"

import { FlexContainer } from "@cs-magic/common/ui/components/flex-container"
import { Label } from "@cs-magic/common/ui/components/shadcn/ui/label"
import {
  Text2ImageAppSVG,
  Text2TextAppSVG,
  V2AGIBrand,
} from "../../../components/assets"

export default function TestSVGPage() {
  return (
    <FlexContainer orientation={"vertical"}>
      <Label>V2AGI</Label>
      <V2AGIBrand className={"h-12"} />

      <Label>Text - Text</Label>
      <Text2TextAppSVG
        className={"h-24 border border-white"}
        // viewBox={"40 40 220 220"}
      />

      <Label>Text - Image</Label>
      <Text2ImageAppSVG
        className={"h-24 border border-white"}
        viewBox={"40 40 220 220"}
      />
    </FlexContainer>
  )
}
