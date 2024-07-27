import { LabelLine } from "@cs-magic/react-ui"
import { Button } from "@cs-magic/react-ui"
import { StandardCard } from "@cs-magic/react-ui"
import { api } from "../trpc/client"
import { TrpcLogEnabled } from "./config-trpc-log-enabled"

export const ConfigTRPCCard = () => {
  const utils = api.useUtils()

  return (
    <StandardCard title={"TRPC"}>
      <TrpcLogEnabled />

      <LabelLine title={"Invalidate ALL"}>
        <Button
          onClick={() => {
            void utils.invalidate()
          }}
        >
          Invalidate
        </Button>
      </LabelLine>
    </StandardCard>
  )
}
