"use client";
import { PropsWithChildren } from "react";
import { useDisplayAutoHeight } from "../../../../packages-to-classify/hooks/use-display-auto-height";
import { useEnhancedRouter } from "../../../../packages-to-classify/hooks/use-enhanced-router";

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight();

  useEnhancedRouter();

  return <>{children}</>;
}
