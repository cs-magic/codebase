import { useAtom } from "jotai"
import { useWindowSize } from "react-use"
import { uiInnerHeight } from "@cs-magic/common/deps/ui/store"

export const useSoftKeyboardOn = () => {
  const { height } = useWindowSize()
  const [ih] = useAtom(uiInnerHeight)

  return (ih ?? 0) < height
}
