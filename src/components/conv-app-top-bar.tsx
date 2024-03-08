import {
  appIdPersistedAtom,
  appsPersistedAtom,
  delAppAtom,
  forkAppAtom,
  stopGeneratingAtom,
} from "@/store/app"
import { useAtom } from "jotai"
import {
  Lock,
  MinusCircleIcon,
  PlusCircleIcon,
  SettingsIcon,
  StopCircle,
  Unlock,
} from "lucide-react"
import { useEnvironments } from "../../packages/common-hooks/use-environments"
import { pusherServerIdAtom } from "../../packages/common-puser/store"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { cn } from "../../packages/common-ui/shadcn/utils"

import { callLLM } from "../app/api/llm/actions/llm-caller"
import { IAppDetail } from "../schema/app.detail"
import {
  checkRespondingStatus,
  getAppResponseAtom,
  requestIdAtom,
} from "../store/conv"
import { ConvAppTitleLine } from "./conv-app-title-line"

export const ConvAppTopBar = ({ app }: { app: IAppDetail }) => {
  const [, forkApp] = useAtom(forkAppAtom)
  const [, delApp] = useAtom(delAppAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [selectedAppID, setSelectedAppID] = useAtom(appIdPersistedAtom)
  const [, stopGenerating] = useAtom(stopGeneratingAtom)
  const [getResponse] = useAtom(getAppResponseAtom)
  const [requestId] = useAtom(requestIdAtom)

  const { id: appId } = app
  const selected = appId === selectedAppID
  const LockOrNot = selected ? Lock : Unlock
  const respondingStatus = checkRespondingStatus(getResponse(app.id))

  const { isMobile } = useEnvironments()
  const [pusherServerId] = useAtom(pusherServerIdAtom)

  return (
    <div
      className={cn(
        "w-full overflow-hidden flex items-center p-2 border-b ",
        "shrink-0",
        selected && "border-b border-primary-foreground/50",
      )}
    >
      <ConvAppTitleLine app={app} />
      <div className={"grow"} />

      {!isMobile && (
        <IconContainer
          className={cn(
            respondingStatus !== "responding" && "text-muted-foreground",
          )}
          tooltipContent={"停止生成会话（仅限正在生成时使用）（TODO）"}
          onClick={() => {
            void callLLM(
              {
                action: "interrupt",
                request: {
                  requestId,
                  appId,
                  type: "app-response",
                  status: "responding",
                  pusherServerId,
                },
              },
              {},
            )
            stopGenerating(true)
          }}
        >
          <StopCircle />
        </IconContainer>
      )}

      {persistedApps.length > 1 && (
        <IconContainer
          tooltipContent={"选中当前的App，每次发送问题时以它的上下文对齐"}
          onClick={() => {
            setSelectedAppID(appId)
          }}
        >
          <LockOrNot className={cn(selected && "text-primary-foreground")} />
        </IconContainer>
      )}

      {(!isMobile || persistedApps.length > 1) && (
        <IconContainer
          tooltipContent={"删除一个App（注意，暂不可恢复）"}
          className={cn(persistedApps.length === 1 && "text-muted-foreground")}
          onClick={() => {
            void delApp(appId)
          }}
        >
          <MinusCircleIcon />
        </IconContainer>
      )}

      {!isMobile && (
        <IconContainer
          tooltipContent={"添加一个App（聊天内容与被选中App同步）"}
          onClick={() => {
            forkApp(app.id)
          }}
        >
          <PlusCircleIcon />
        </IconContainer>
      )}

      <IconContainer tooltipContent={"设置App（TODO）"}>
        <SettingsIcon />
      </IconContainer>
    </div>
  )
}
