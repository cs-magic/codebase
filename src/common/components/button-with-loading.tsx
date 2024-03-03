import { ComponentProps } from "react"
import { Button } from "@/common/components/ui/button"
import { LoaderIcon } from "lucide-react"

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
      ) : downtime ? (
        `${downtime} S`
      ) : (
        children
      )}
    </Button>
  )
}
