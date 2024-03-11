import { api } from "../../packages/common-trpc/react"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"

import { ConfigCard } from "./config-card"
import { TrpcLogEnabled } from "./config-trpc-log-enabled"

export const ConfigTRPCCard = () => {
  const utils = api.useUtils()

  return (
    <ConfigCard title={"TRPC"}>
      <TrpcLogEnabled />

      <LabelLine title={"Invalidate ALL"}>
        <Button
          onClick={() => {
            utils.invalidate()
          }}
        >
          Invalidate
        </Button>
      </LabelLine>
    </ConfigCard>
  )
}
