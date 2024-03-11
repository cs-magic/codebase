import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../common-ui/shadcn/shadcn-components/select"
import { LogLevel } from "../schema"

export const SelectLogLevel = ({
  value,
  setValue,
}: {
  value: LogLevel
  setValue: (v: LogLevel) => void
}) => {
  return (
    <Select
      value={value.toString()}
      onValueChange={(v) => setValue(Number(v) as LogLevel)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value={"0"}>Verbose</SelectItem>
          <SelectItem value={"1"}>Debug</SelectItem>
          <SelectItem value={"2"}>Info</SelectItem>
          <SelectItem value={"3"}>Warning</SelectItem>
          <SelectItem value={"4"}>Error</SelectItem>
          <SelectItem value={"5"}>Critical</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
