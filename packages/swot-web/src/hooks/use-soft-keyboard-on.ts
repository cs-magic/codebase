import { uiInnerHeight } from "@cs-magic/ui"
import { useAtom } from "jotai"
import { useWindowSize } from "react-use"

export const useSoftKeyboardOn = () => {
  const { height } = useWindowSize()
  const [ih] = useAtom(uiInnerHeight)

  return (ih ?? 0) < height
}
