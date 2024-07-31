"use client"
import { DevConfig } from "@/components/dev-config"
import { DevSocketStatus } from "@cs-magic/swot-frontend/components/dev-socket-status"

export const Dev = () => {
  return (
    <>
      {/*<DevData />*/}

      <DevConfig />

      <DevSocketStatus />
    </>
  )
}
