import { useAtom } from "jotai"
import { Input } from "../../packages/common/components/ui/input"
import { useUserDraftName } from "../../packages/common/hooks/use-user"
import { smsNameAtom } from "../../packages/common/lib/sms/store"

export const UserInputName = () => {
  const name = useUserDraftName()
  const [, setName] = useAtom(smsNameAtom)

  return (
    <Input
      className={"text-primary-foreground font-black text-2xl text-center"}
      autoFocus
      value={name}
      onChange={(event) => {
        setName(event.currentTarget.value)
      }}
    />
  )
}
