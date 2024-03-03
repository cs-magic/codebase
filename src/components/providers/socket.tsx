"use client"

import { PropsWithChildren, useEffect } from "react"
import { useSocketStore } from "@/lib/socket"

export default function SocketProvider({ children }: PropsWithChildren) {
  // const { init, clean } = useSocketStore((state) => ({
  //   init: state.init,
  //   clean: state.clean,
  // }))
  //
  // useEffect(() => {
  //   init()
  // }, [])
  //
  // useEffect(() => {
  //   window.addEventListener("beforeunload", clean)
  //   return () => {
  //     window.removeEventListener("beforeunload", clean)
  //   }
  // }, [clean])

  return <>{children}</>
}
