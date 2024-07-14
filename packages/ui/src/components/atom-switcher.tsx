import { Atom, PrimitiveAtom, useAtom } from "jotai"
import React from "react"
import { LabelLine } from "./label-line.js"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/ui/select.js"
import { Switch } from "./shadcn/ui/switch.js"

/**
 * @param atom
 * @param name todo: how to retrieve the name from input atom's variable name so that we can omit the name param
 * @constructor
 */
export const AtomSwitcher = ({
  atom,
  name,
}: {
  atom: any // todo: augment
  name: string
}) => {
  const [v, setV] = useAtom(atom as PrimitiveAtom<boolean>)

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
  name: string
  vs: T[]
  atom: Atom<T>
}) => {
  const [v, setV] = useAtom(atom)
  return <BaseSelector v={v} setV={setV} name={name} vs={vs} />
}

export const BaseSelector = <T extends string>({
  name,
  v,
  setV,
  vs,
}: {
  name: string
  v: T
  setV: (v: T) => void
  vs: T[]
}) => {
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
