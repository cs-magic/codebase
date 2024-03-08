import { InputWithEnter } from "../../packages/common-ui/components/input"
import { useDraftSession } from "../../packages/common-hooks/use-user-draft-session"

export const UserInputName = ({
  onEnter,
}: {
  onEnter?: (s: string) => void
}) => {
  const { draft, value, setDraft } = useDraftSession("name")

  return (
    <InputWithEnter
      className={"text-primary-foreground font-black text-2xl text-center"}
      autoFocus
      value={draft ?? ""}
      onChange={(event) => {
        setDraft(event.currentTarget.value)
      }}
      onEnter={(s) => {
        if (onEnter) onEnter(s)
      }}
    />
  )
}
