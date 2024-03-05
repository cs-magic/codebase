"use client"

import { FlexContainer } from "packages/common/components/flex-container"
import { ButtonLink } from "../../../packages/common/components/button-link"

export default function TestPage() {
  return (
    <FlexContainer orientation={"vertical"}>
      <ButtonLink href={"test/socket"}>Socket</ButtonLink>

      <ButtonLink href={"test/jotai/scope-providers"}>
        Jotai Nested/Scope Providers
      </ButtonLink>
    </FlexContainer>
  )
}
