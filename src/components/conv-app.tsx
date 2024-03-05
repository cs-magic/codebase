"use client"

import { IAppInChat } from "@/schema/app"
import { useAtom } from "jotai"
import { cn } from "../../packages/common/lib/utils"
import { useConvSSE } from "../hooks/use-conv-sse"
import { RoleType } from "../schema/message"
import { appIdPersistedAtom, appsPersistedAtom } from "../store/app"
import { commonContextAtom, requestAtom } from "../store/conv"
import { ConvAppMessages } from "./conv-app-messages"
import { ConvAppTopBar } from "./conv-app-top-bar"

export const ConvApp = ({ app }: { app: IAppInChat }) => {
  useConvSSE(app.id)

  const [commonContext] = useAtom(commonContextAtom)
  const [apps] = useAtom(appsPersistedAtom)
  const [selectedAppId] = useAtom(appIdPersistedAtom)
  const [request] = useAtom(requestAtom)
  const targetAppId = apps.some((a) => a.id === app.id) ? app.id : selectedAppId
  const response = request?.responses.find((r) => r.appId === targetAppId)
  const context = !response
    ? commonContext
    : [
        ...commonContext,
        {
          content: response.error ?? response.response ?? "",
          role: "assistant" as RoleType,
          updatedAt: response.updatedAt,
          isError: !!response.error,
        },
      ]

  return (
    <div
      className={cn(
        "w-full h-full overflow-auto flex flex-col relative border-t border-r",
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
