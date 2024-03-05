"use client"

import { useAtom } from "jotai"
import { Slider } from "packages/common/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../packages/common/components/ui/select"
import {
  convDetailFromServerAtom,
  requestIdAtom,
  requestSliderAtom,
} from "../store/conv"

export const ConvControl = () => {
  const [conv] = useAtom(convDetailFromServerAtom)
  const [requestId, setRequestId] = useAtom(requestIdAtom)
  const [{ current, max }, actions] = useAtom(requestSliderAtom)
  const { inc, dec, setN } = actions()

  return (
    <div className={"m-2 flex items-center gap-4"}>
      <Select value={requestId ?? undefined} onValueChange={setRequestId}>
        <SelectTrigger className={"w-36"}>
          <SelectValue placeholder={"request-id"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {conv?.requests.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.id}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Slider
        defaultValue={[current]}
        max={max}
        step={1}
        onValueChange={(vs) => setN(vs[0]!)}
      />
    </div>
  )
}
