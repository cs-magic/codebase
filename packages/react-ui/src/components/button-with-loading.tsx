import { LoaderIcon } from "lucide-react"
import React, { ComponentProps } from "react"

import { Button } from "@/shadcn/ui/button"

export const ButtonWithLoading = ({
  children,
  disabled,
  loading,
  downtime,
  ...props
}: ComponentProps<typeof Button> & {
  loading?: boolean
  downtime?: number
}) => {
  return (
    <Button
      disabled={disabled ?? loading ?? (downtime ? downtime > 0 : false)}
      {...props}
    >
      {loading ? (
        <LoaderIcon className={"animate-spin"} />
      ) : !downtime || downtime <= 0 ? (
        children
      ) : (
        `${downtime} S`
      )}
    </Button>
  )
}
