import { useAtom } from "jotai"
import { capitalize } from "lodash"
import { Atom } from "../../packages/common-state-management/jotai/types"
import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import { ActionType } from "../schema/card"
import {
  cardCopyingAtom,
  cardDownloadingAtom,
  cardGeneratingAtom,
  cardUploadingAtom,
} from "../store/card.atom"

export const GenCardActionButton = ({
  disabled,
  type,
  action,
}: {
  action: (type: ActionType) => Promise<void>
  disabled?: boolean
  type: ActionType
}) => {
  const atomMap: Record<ActionType, Atom<boolean>> = {
    generate: cardGeneratingAtom,
    copy: cardCopyingAtom,
    download: cardDownloadingAtom,
    upload: cardUploadingAtom,
  }

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
