import { api } from "@cs-magic/common"
import { LabelLine } from "@cs-magic/common"
import { Button } from "@cs-magic/common"

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
