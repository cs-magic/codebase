import { atom } from "jotai"
import { IDisplay } from "../common-ui/schema"
import { uiScreenAtom } from "../common-ui/store"

//////////////////////////////
// base
//////////////////////////////

export const tvFullScreenAtom = atom(false)
export const tvScreenOnAtom = atom(true)

export const tvViewportAtom = atom<IDisplay>({ width: 0, height: 0 })

//////////////////////////////
// derived
//////////////////////////////

export const tvTargetWidthAtom = atom((get) => {
  const { width: w, height: h } = get(uiScreenAtom)
  return get(tvFullScreenAtom)
    ? // 全屏占满
      Math.min(w, h)
    : w > h
      ? // pc
        h / 2
      : // mobile
        w / 2
})
export const tvScaleAtom = atom((get) => {
  return get(tvTargetWidthAtom) / 420 // css中的固定尺寸
})

export const getTvScale = ({ width, height }: IDisplay) =>
  Math.min(width, height) / 420
