import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@cs-magic/shadcn/dist/ui/dialog";
import StripePricingTable from "@cs-magic/poketto/src/components/stripe/pricing-table";

export function ChargeContainer(
  props: React.ComponentPropsWithoutRef<typeof DialogTrigger>,
) {
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="w-full max-w-[1080px] max-h-[80vh] overflow-auto">
        <StripePricingTable />
      </DialogContent>
    </Dialog>
  );
}
