"use client"

import { useAtom } from "jotai"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../packages/common/components/ui/select"
import { convDetailFromServerAtom, requestIdAtom } from "../store/conv"

export const ConvControl = () => {
  const [conv] = useAtom(convDetailFromServerAtom)
  const [requestId, setRequestId] = useAtom(requestIdAtom)

  return (
    <div className={"m-2"}>
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
    </div>
  )
}
