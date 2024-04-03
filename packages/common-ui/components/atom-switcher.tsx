import { useAtom } from "jotai"
import { Atom } from "../../common-state-management/jotai/types"
import { Label } from "../../common-ui-shadcn/components/label"
import { Switch } from "../../common-ui-shadcn/components/switch"

export const AtomSwitcher = ({
  atom,
  name,
}: {
  atom: Atom<boolean>
  name: string
}) => {
  const [v, setV] = useAtom(atom)

  return (
    <div className={"flex items-center gap-2 justify-between"}>
      <Label className={"shrink-0"}>{name}</Label>
      <Switch checked={v} onCheckedChange={setV} />
    </div>
  )
}
