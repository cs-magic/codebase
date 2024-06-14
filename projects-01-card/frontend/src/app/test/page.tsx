"use client"

import { FlexContainer } from "@cs-magic/common/deps/ui/components/flex-container"
import { ButtonLink } from "@cs-magic/common/deps/ui/components/button-link"

export default function TestPage() {
  return (
    <FlexContainer
      orientation={"vertical"}
      className={"mx-auto w-full sm:w-[320px]"}
    >
      <ButtonLink href={"/test/socket"}>Socket</ButtonLink>

      <ButtonLink href={"/test/jotai/scope-providers"}>
        Jotai Nested/Scope Providers
      </ButtonLink>

      <ButtonLink href={"/test/trpc/router-in-client"}>
        trpc server update in client
      </ButtonLink>

      <ButtonLink href={"/test/css/wrap"}>css wrap</ButtonLink>

      <ButtonLink href={"/test/video"}>video</ButtonLink>
    </FlexContainer>
  )
}
