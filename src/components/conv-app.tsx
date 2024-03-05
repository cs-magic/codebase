"use client"

import { ConvAppMessages } from "./conv-app-messages"
import { ConvAppTopBar } from "./conv-app-top-bar"
import { IAppInChat } from "@/schema/app"
import { cn } from "../../packages/common/lib/utils"
import { useConvSSE } from "../hooks/use-conv-sse"
import { IContext } from "../schema/message"

export const ConvApp = ({
  app,
  context,
}: {
  app: IAppInChat
  context: IContext
}) => {
  useConvSSE(app.id)

  return (
    <div
      className={cn(
        "w-full h-full overflow-hidden flex flex-col relative border-t border-r",
      )}
    >
      <ConvAppTopBar appId={app.id} title={app?.model.title} />

      <ConvAppMessages
        appId={app.id}
        logo={app?.model.logo}
        context={context}
      />
    </div>
  )
}
