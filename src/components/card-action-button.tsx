"use client"

import { ActionType } from "@/schema/card"
import { useAtom } from "jotai"
import { capitalize } from "lodash"
import { Atom } from "../../packages/common-state-management/jotai/types"
import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import {
  cardCopyingAtom,
  cardDownloadingAtom,
  cardGeneratingAtom,
  cardUploadingAtom,
} from "../store/card.atom"

const atomMap: Record<ActionType, Atom<boolean>> = {
  generate: cardGeneratingAtom,
  copy: cardCopyingAtom,
  download: cardDownloadingAtom,
  upload: cardUploadingAtom,
}

export const ActionButton = ({
  disabled,
  type,
  action,
}: {
  action: (type: ActionType) => Promise<void>
  disabled?: boolean
  type: ActionType
}) => {
  const [v, setV] = useAtom(atomMap[type])

  return (
    <ButtonWithLoading
      id={`${type}-card`}
      className={"w-24"}
      size={"sm"}
      loading={v}
      disabled={disabled}
      onClick={async () => {
        setV(true)
        await action(type).finally(() => {
          setV(false)
        })
      }}
    >
      {capitalize(type)}
    </ButtonWithLoading>
  )
}
