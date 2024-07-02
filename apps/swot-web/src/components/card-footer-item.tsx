import { LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { FlexContainer } from "@cs-magic/common/ui/components/flex-container"

export const CardFooterItem = ({
  Icon,
  value,
}: {
  Icon: LucideIcon
  value?: string | null
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(14)

  useEffect(() => {
    if (!ref.current) return

    const { scrollWidth, offsetWidth, clientWidth } = ref.current
    // console.log({ scrollWidth, offsetWidth, clientWidth });

    if (scrollWidth > clientWidth) {
      setFontSize((f) => f - 1)
    }
  }, [ref.current, value, fontSize])

  return (
    <FlexContainer orientation={"vertical"} className={"!gap-1 !p-0 "}>
      <Icon />
      <div
        style={{ fontSize }}
        ref={ref}
        className={"truncate text-nowrap text-center"}
      >
        {value ?? "-"}
      </div>
    </FlexContainer>
  )
}
