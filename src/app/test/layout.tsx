import { PropsWithChildren } from "react"
import { FlexContainer } from "../../../packages/common/components/flex-container"

export default function TestLayout({ children }: PropsWithChildren) {
  return <FlexContainer orientation={"vertical"}>{children}</FlexContainer>
}
