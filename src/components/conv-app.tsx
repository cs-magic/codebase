"use client"

import { useSnapshot } from "valtio"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { useLLMForAppChat } from "../hooks/use-llm-for-app-chat"
import { IAppClient } from "../schema/app.detail"
import { RoleType } from "../schema/message"
import { coreValtio } from "../store/core.valtio"
import { ConvAppMessages } from "./conv-app-messages"
import { ConvAppTopBar } from "./conv-app-top-bar"
import { useEffect } from "react"

export const ConvApp = ({ app }: { app: IAppClient }) => {
  const { commonContext } = useSnapshot(coreValtio)

  const context = !app.response
    ? commonContext
    : [
        ...commonContext,
        {
          content: app.response.error ?? app.response.content ?? "",
          role: "assistant" as RoleType,
          updatedAt: app.response.updatedAt,
          isError: !!app.response.error,
        },
      ]

  useLLMForAppChat(
    app.response?.requestId ?? null,
    app.id,
    app.clientId,
    app.response,
  )

  // console.log({ appId: config.id, commonContext, response })

  return (
    <div
      className={cn(
        "w-full h-full overflow-auto flex flex-col relative border-t border-r",
      )}
    >
      <ConvAppTopBar app={app} />

      <div className={"grow overflow-auto"}>
        {app.isDraft ? (
          "draft"
        ) : (
          <ConvAppMessages
            appId={app.id}
            logo={app?.model.logo}
            context={context}
          />
        )}
      </div>
    </div>
  )
}
