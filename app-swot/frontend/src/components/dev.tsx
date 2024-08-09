"use client"
import { DevConfig } from "./dev-config"
import { DevSocketStatus } from "./dev-socket-status"

export const Dev = () => {
  return (
    <>
      {/*<DevData />*/}

      <DevConfig />

      <DevSocketStatus />
    </>
  )
}
