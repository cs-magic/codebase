import { useAtom } from "jotai"
import { useWindowSize } from "react-use"
import { uiInnerHeight } from "../../packages/common-ui/store"

export const useSoftKeyboardOn = () => {
  const { height } = useWindowSize()
  const [ih] = useAtom(uiInnerHeight)

  return (ih ?? 0) < height
}
