// "use client"
//
// import { uiInnerHeight } from "@/store/ui"
// import { useAtom } from "jotai"
// import { useCallback, useEffect } from "react"
// import { toast } from "sonner"
//
// /**
//  * ref: https://gist.github.com/MartijnHols/e9f4f787efa9190885a708468f63c5bb
//  */
// export const useAutoHeight = () => {
//   const [h, setH] = useAtom(uiInnerHeight)
//
//   const vh = window.visualViewport?.height ?? window.innerHeight
//
//   const getHeight = useCallback(() => {
//     const { visualViewport, innerHeight: ih } = window
//     const vh = visualViewport?.height
//     const h = vh ?? ih
//     setH(h)
//     return h
//   }, [])
//
//   useOnScreenKeyboardScrollFix()
//
//   useEffect(() => {
//     const handleResize = () => {
//       const h = getHeight()
//
//       if (vh < h) {
//         const unit = (h - vh) / 10
//         let cnt = 0
//         const f = setInterval(() => {
//           if (++cnt > 10) clearInterval(f)
//             document.documentElement.style.setProperty("--app-height", `${vh - }px`)
//
//             // setH((h) => h - unit)
//         }, 100)
//       } else if (vh > h) {
//         const unit = (vh - h) / 5
//         let cnt = 0
//         const f = setInterval(() => {
//             document.documentElement.style.setProperty("--app-height", `${h}px`)
//
//             // setH((h) => h + unit)
//           if (++cnt >= 5) clearInterval(f)
//         }, 100)
//       }
//
//       window.scrollTo(0, 0)
//     }
//
//     window.addEventListener("resize", handleResize)
//
//     window.addEventListener("orientationchange", handleResize)
//
//     // This is needed on iOS to resize the viewport when the Virtual/OnScreen
//     // Keyboard opens. This does not trigger any other event, or the standard
//     // resize event.
//     window.visualViewport?.addEventListener("resize", handleResize)
//
//     handleResize()
//     return () => {
//       window.removeEventListener("resize", handleResize)
//       window.removeEventListener("orientationchange", handleResize)
//
//       window.visualViewport?.removeEventListener("resize", handleResize)
//     }
//   }, [getHeight])
// }
//
// /**
//  * 不加这条的话 会导致到顶部去
//  */
// export const useOnScreenKeyboardScrollFix = () => {
//   useEffect(() => {
//     const handleScroll = () => {
//       window.scrollTo(0, 0)
//     }
//
//     window.addEventListener("scroll", handleScroll)
//
//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])
// }
