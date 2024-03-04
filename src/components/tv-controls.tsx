import { tvScreenOnAtom } from "@/store/tv"
import { tvFullScreenAtom } from "@/store/tv"
import { useAtom } from "jotai/index"

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
