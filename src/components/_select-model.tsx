import { ScenarioType } from "@/schema/scenario"
import { ElementType } from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import {
  SelectItem as SelectPrimitiveItem,
  SelectItemText,
} from "@radix-ui/react-select"
import { Check } from "lucide-react"

export const SelectModel = ({
  value,
  Cover,
  label,
}: {
  value: ScenarioType
  Cover: ElementType
  label: string
}) => {
  return (
    <SelectPrimitiveItem
      value={value}
      className={
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      }
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <div className={"flex items-center gap-2 shrink-0"}>
        <SelectItemText>
          <Cover className={"w-10 h-10"} />
        </SelectItemText>
        <span>{label}</span>
      </div>
    </SelectPrimitiveItem>
  )
}
