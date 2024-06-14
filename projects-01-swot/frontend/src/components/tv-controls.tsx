import { useSetAtom } from "jotai"
import {
  tvFullScreenAtom,
  tvScreenOnAtom,
} from "@cs-magic/common/deps/extend-tv/store"

export const Controls = () => {
  const toggleFullscreen = useSetAtom(tvFullScreenAtom)
  const toggleScreenOn = useSetAtom(tvScreenOnAtom)

  return (
    <div className="buttons">
      {/*  右下第一个按钮 */}
      <div
        className="button-container"
        onClick={() => {
          toggleFullscreen((v) => !v)
        }}
      >
        <div className="button"></div>
      </div>

      {/*  右下第二个按钮，用于打开关闭 */}
      <div
        className="button-container"
        onClick={() => {
          toggleScreenOn((v) => !v)
        }}
      >
        <div className="button"></div>
      </div>
    </div>
  )
}
