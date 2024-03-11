"use client"
import { useAtom } from "jotai"
import { devEnabledAtom } from "../../packages/common-dev/store"

import { DevConfig } from "./dev-config"
import { DevData } from "./dev-data"
import { DevSocketStatus } from "./dev-socket-status"

export const Dev = () => {
  const [devEnabled] = useAtom(devEnabledAtom)

  if (!devEnabled) return null

  return (
    <>
      <DevData />

      <DevConfig />

      <DevSocketStatus />
    </>
  )
}
