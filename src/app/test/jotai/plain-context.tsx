import { PropsWithChildren, useEffect } from "react"
import { useToggle } from "react-use"
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container"
import { Button } from "../../../../packages/common-ui/shadcn/shadcn-components/button"
import { Label } from "../../../../packages/common-ui/shadcn/shadcn-components/label"
import { cn } from "../../../../packages/common-ui/shadcn/utils"
import { base1Atom, base2Atom } from "./store"
import { useAtom } from "jotai"

export const PlainContext = ({ children }: PropsWithChildren) => {
  const [p1, setP1] = useAtom(base1Atom)
  const [p2, setP2] = useAtom(base2Atom)

  const [on1, toggle1] = useToggle(false)
  useEffect(() => {
    toggle1()
    setTimeout(() => {
      toggle1()
    }, 1000)
  }, [p1])

  const [on2, toggle2] = useToggle(false)
  useEffect(() => {
    toggle2()
    setTimeout(() => {
      toggle2()
    }, 1000)
  }, [p2])

  return (
    <FlexContainer orientation={"vertical"} className={"bg-cyan-900"}>
      <div className={cn("flex items-center gap-2", on1 && "animate-bounce")}>
        <Label>p1: </Label>
        <span>{p1}</span>
        <Button
          onClick={() => {
            setP1((v) => v + 1)
          }}
        >
          ADD
        </Button>
      </div>

      <div className={cn("flex items-center gap-2", on2 && "animate-bounce")}>
        <Label>p2: </Label>
        <span>{p2}</span>
        <Button
          onClick={() => {
            setP2((v) => v + 1)
          }}
        >
          ADD
        </Button>
      </div>

      {children}
    </FlexContainer>
  )
}
