import { api } from "@/trpc/client"
import { LabelLine } from "@cs-magic/react-ui"
import { Button } from "@cs-magic/react-ui"
import { StandardCard } from "@cs-magic/react-ui"
import { TrpcLogEnabled } from "@cs-magic/swot-frontend/components/config-trpc-log-enabled"

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
