import { api } from "@cs-magic/common/trpc/react"
import { LabelLine } from "@cs-magic/common/ui/components/label-line"
import { Button } from "@cs-magic/common/ui-shadcn/components/button"

import { StandardCard } from "../../../../packages/common/ui/components/standard-card"
import { TrpcLogEnabled } from "./config-trpc-log-enabled"

export const ConfigTRPCCard = () => {
  const utils = api.useUtils()

  return (
    <StandardCard title={"TRPC"}>
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
    </StandardCard>
  )
}
