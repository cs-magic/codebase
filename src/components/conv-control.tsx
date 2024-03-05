"use client"

import { useAtom } from "jotai"
import { FlexContainer } from "../../packages/common/components/flex-container"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../packages/common/components/ui/select"
import { convDetailAtom, convsAtom, requestAtom } from "../store/conv"

export const ConvControl = () => {
  const [conv] = useAtom(convDetailAtom)
  const [request] = useAtom(requestAtom)
  const requestId = request?.id ?? "unknown"

  return (
    <div className={"m-2"}>
      <Select value={requestId}>
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
