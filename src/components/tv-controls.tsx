import { tvScreenOnAtom } from "../../packages/extend-tv/store"
import { tvFullScreenAtom } from "../../packages/extend-tv/store"
import { useAtom } from "jotai"

export const Controls = () => {
  const [, toggleFullscreen] = useAtom(tvFullScreenAtom)
  const [, toggleScreenOn] = useAtom(tvScreenOnAtom)

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
