import { api } from "../../../../common/trpc/react";
import { LabelLine } from "../../../../common/ui/components/label-line";
import { Button } from "../../../../common/ui-shadcn/components/button";

import { StandardCard } from "./standard-card";
import { TrpcLogEnabled } from "./config-trpc-log-enabled";

export const ConfigTRPCCard = () => {
  const utils = api.useUtils();

  return (
    <StandardCard title={"TRPC"}>
      <TrpcLogEnabled />

      <LabelLine title={"Invalidate ALL"}>
        <Button
          onClick={() => {
            utils.invalidate();
          }}
        >
          Invalidate
        </Button>
      </LabelLine>
    </StandardCard>
  );
};
