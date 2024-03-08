"use client"

import { FlexContainer } from "../../../packages/common-ui/components/flex-container"
import { ButtonLink } from "../../../packages/common-ui/components/button-link"

export default function TestPage() {
  return (
    <FlexContainer
      orientation={"vertical"}
      className={"w-full sm:w-[320px] mx-auto"}
    >
      <ButtonLink href={"test/socket"}>Socket</ButtonLink>

      <ButtonLink href={"test/jotai/scope-providers"}>
        Jotai Nested/Scope Providers
      </ButtonLink>

      <ButtonLink href={"test/trpc/router-in-client"}>
        trpc server update in client
      </ButtonLink>
    </FlexContainer>
  )
}
