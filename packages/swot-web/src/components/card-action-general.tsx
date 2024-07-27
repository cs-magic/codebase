"use client"

import { ButtonWithLoading } from "@cs-magic/ui"
import { cn } from "@cs-magic/common"
import { ActionType } from "@cs-magic/swot-core"
import { atom, PrimitiveAtom, useAtom } from "jotai"
import capitalize from "lodash/capitalize"
import { HTMLAttributes } from "react"
import {
  cardCopyingAtom,
  cardDownloadingAtom,
  cardGeneratingAtom,
  cardResettingAtom,
  cardUploadingAtom,
} from "../store/card.actions.atom"

const tAtom = atom(false)

export const GeneralCardAction = ({
  disabled,
  type,
  action,
  className,
  onClick,
  ...props
}: {
  action: (type: ActionType) => Promise<void>
  disabled?: boolean
  type: ActionType
} & HTMLAttributes<HTMLButtonElement>) => {
  const atomMap: Record<ActionType, PrimitiveAtom<boolean>> = {
    generate: cardGeneratingAtom,
    copy: cardCopyingAtom,
    download: cardDownloadingAtom,
    upload: cardUploadingAtom,
    reset: cardResettingAtom,
  }

  const [v, setV] = useAtom(atomMap[type])
  const [v2, setV2] = useAtom(tAtom)

  return (
    <ButtonWithLoading
      id={`${type}-card`}
      className={cn("w-24", className)}
      size={"sm"}
      loading={v}
      disabled={disabled}
      onClick={async () => {
        setV(true)
        // await sleep(3000)
        await action(type).finally(() => {
          setV(false)
        })
      }}
      {...props}
    >
      {capitalize(type)}
    </ButtonWithLoading>
  )
}
