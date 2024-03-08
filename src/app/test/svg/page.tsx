"use client"

import { Text2ImageAppSVG, Text2TextAppSVG, V2AGIBrand } from "@/config/assets"
import { Label } from "../../../../packages/common-ui/shadcn/shadcn-components/label"
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container"

export default function TestSVGPage() {
  return (
    <FlexContainer orientation={"vertical"}>
      <Label>V2AGI</Label>
      <V2AGIBrand x className={"h-12"} />

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
