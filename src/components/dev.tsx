"use client"
import { DevConfig } from "./dev-config"
import { DevData } from "./dev-data"
import { DevSocketStatus } from "./dev-socket-status"

export const Dev = () => {
  return (
    <>
      <DevData />

      <DevConfig />

      <DevSocketStatus />
    </>
  )
}
