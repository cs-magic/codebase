import Head from "next/head";
import React from "react";

import { useUser } from "@/hooks/use-user";
import { encodeClientReferenceId } from "@/packages/common/src/stripe/utils";
import {
  STRIPE_PRICING_TABLE_ID,
  STRIPE_PUBLISHABLE_KEY,
} from "@/packages/common/src/payment";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // for server, ref: https://stripe.com/docs/payments/checkout/pricing-table#embed
      "server-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

/**
 * ref:
 *  1. https://www.reddit.com/r/reactjs/comments/x0uetq/comment/jggr4le/?utm_source=share&utm_medium=web2x&context=3
 *  2. https://stripe.com/docs/payments/checkout/pricing-table#embed
 *
 * id: https://dashboard.stripe.com/pricing-tables
 */
function StripePricingTable() {
  const { user } = useUser();
  if (!user) {
    return <h1> You should login first to view the pricing table</h1>;
  }

  const clientReferenceId = encodeClientReferenceId(user.id);
  console.log({ clientReferenceId });

  return (
    <>
      <Head>
        <script async src="https://js.stripe.com/v3/pricing-table.js" />
      </Head>

      <stripe-pricing-table
        pricing-table-id={STRIPE_PRICING_TABLE_ID}
        publishable-key={STRIPE_PUBLISHABLE_KEY}
        client-reference-id={clientReferenceId}
        customer-email={user.email}
      />
    </>
  );
}

export default StripePricingTable;
