"use client"

import { useAtom } from "jotai"
import { Button } from "../../../../../packages/common-ui-shadcn/components/button"
import { cn } from "../../../../../packages/common-ui-shadcn/utils"
import { ButtonWithLoading } from "../../../../../packages/common-ui/components/button-with-loading"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Textarea } from "../../../../../packages/common-ui/components/textarea-auto"
import { cardNewContentAtom } from "../../../../store/card.atom"

export default function NewCardPage() {
  const [v, setV] = useAtom(cardNewContentAtom)

  return (
    <FlexContainer
      className={cn(
        // "bg-cyan-950",
        " items-center",
      )}
    >
      <FlexContainer orientation={"vertical"} className={"max-w-[720px]"}>
        <Textarea
          atom={cardNewContentAtom}
          className={"bg-cyan-900 focus-visible:ring-cyan-800"}
          minRows={4}
        />

        <div className={"flex items-center w-full"}>
          <ButtonWithLoading className={"ml-auto"} size={"sm"} disabled={!v}>
            Submit
          </ButtonWithLoading>
        </div>
      </FlexContainer>
    </FlexContainer>
  )
}
