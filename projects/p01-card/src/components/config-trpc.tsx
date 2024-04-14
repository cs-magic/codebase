import { api } from "../../../../packages/common-trpc/react";
import { LabelLine } from "../../../../packages/common-ui/components/label-line";
import { Button } from "../../../../packages/common-ui-shadcn/components/button";

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
