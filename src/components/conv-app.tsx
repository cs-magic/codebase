"use client"

import { useAtom } from "jotai"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { useLLMForAppChat } from "../hooks/use-llm-for-app-chat"
import { IAppDetail } from "../schema/app.detail"
import { IContext, RoleType } from "../schema/message"
import { appIdPersistedAtom, appsPersistedAtom } from "../store/app"
import { responsesAtom } from "../store/conv"
import { ConvAppMessages } from "./conv-app-messages"
import { ConvAppTopBar } from "./conv-app-top-bar"

export const ConvApp = ({
  app,
  commonContext,
}: {
  app: IAppDetail
  commonContext: IContext
}) => {
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [selectedAppId] = useAtom(appIdPersistedAtom)
  const [responses] = useAtom(responsesAtom)

  const targetAppId = persistedApps.some((a) => a.id === app.id)
    ? app.id
    : selectedAppId
  const response = responses.find((r) => r.appId === targetAppId)
  const context = !response
    ? commonContext
    : [
        ...commonContext,
        {
          content: response.error ?? response.content ?? "",
          role: "assistant" as RoleType,
          updatedAt: response.updatedAt,
          isError: !!response.error,
        },
      ]

  useLLMForAppChat(app.id, response)

  // console.log({ appId: config.id, commonContext, response })

  return (
    <div
      className={cn(
        "w-full h-full overflow-auto flex flex-col relative border-t border-r",
      )}
    >
      <ConvAppTopBar app={app} />

      <ConvAppMessages
        appId={app.id}
        logo={app?.model.logo}
        context={context}
      />
    </div>
  )
}
