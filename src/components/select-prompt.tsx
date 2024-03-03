import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select"

export const SelectPrompt = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={"prompt"} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Prompt</SelectLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
