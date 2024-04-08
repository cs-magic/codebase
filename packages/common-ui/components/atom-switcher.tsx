import { useAtom } from "jotai"
import { Atom } from "../../common-state-management/jotai/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../common-ui-shadcn/components/select"
import { Switch } from "../../common-ui-shadcn/components/switch"
import { LabelLine } from "./label-line"

/**
 * @param atom
 * @param name todo: how to retrieve the name from input atom's variable name so that we can omit the name param
 * @constructor
 */
export const AtomSwitcher = ({
  atom,
  name,
}: {
  atom: Atom<boolean>
  name: string
}) => {
  const [v, setV] = useAtom(atom)

  return (
    <LabelLine title={name}>
      <Switch checked={v} onCheckedChange={setV} />
    </LabelLine>
  )
}

export const AtomSelector = <T extends string>({
  atom,
  name,
  vs,
}: {
  atom: Atom<T>
  name: string
  vs: T[]
}) => {
  const [v, setV] = useAtom(atom)

  return (
    <LabelLine title={name}>
      <Select value={v} onValueChange={(v) => setV(v as T)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {vs.map((v) => (
            <SelectItem value={v} key={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </LabelLine>
  )
}
