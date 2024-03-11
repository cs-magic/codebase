"use client"

import { useAtomValue } from "jotai"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { useLLMForAppChat } from "../hooks/use-llm-for-app-chat"
import { IAppClient } from "../schema/app.detail"
import { RoleType } from "../schema/message"
import { convAtomStore } from "../store/conv.store"
import { ConvAppMessages } from "./conv-app-messages"
import { ConvAppTopBar } from "./conv-app-top-bar"

export const ConvApp = ({ app }: { app: IAppClient }) => {
  // const commonContext = useConvStore.use.commonContext()
  const { commonContext } = useAtomValue(convAtomStore)
  // useSnapshot(convStore)

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

  useLLMForAppChat(app.response?.requestId ?? null, app.id, app.response)

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
