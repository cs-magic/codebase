import { useAtom } from "jotai"
import {
  Lock,
  MinusCircleIcon,
  PlusCircleIcon,
  SettingsIcon,
  StopCircle,
  Unlock,
} from "lucide-react"
import { useSnapshot } from "valtio"
import { useEnvironments } from "../../packages/common-hooks/use-environments"

import { callLLM } from "../../packages/common-llm/actions/llm-caller"
import { pusherServerIdAtom } from "../../packages/common-puser/store"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { IAppClient } from "../schema/app.detail"
import { stopGeneratingAtom } from "../store/app.atom"
import { convStore } from "../store/conv.valtio"
import { checkRespondingStatus } from "../utils"
import { ConvAppTitleLine } from "./conv-app-title-line"

export const ConvAppTopBar = ({ app }: { app: IAppClient }) => {
  const [, stopGenerating] = useAtom(stopGeneratingAtom)

  // const [apps] = useAtom(appsPersistedAtom)
  // const [, delApp] = useAtom(delAppAtom)
  // const [, forkApp] = useAtom(forkAppAtom)
  // const [requestId] = useAtom(requestIdAtom)
  // const [selectedAppID, setSelectedAppID] = useAtom(appIdPersistedAtom)

  // const requestId = useConvStore.use.requestId()
  // const apps = useConvStore.use.apps()
  // const forkApp = useConvStore.use.forkApp()
  // const delApp = useConvStore.use.delApp()
  // const appIndex = useConvStore.use.appIndex()
  // const selectApp = useConvStore.use.selectApp()

  const { requestId, apps, appIndex } = useSnapshot(convStore)

  const selected = app.clientId === apps[appIndex]?.clientId
  const LockOrNot = selected ? Lock : Unlock
  const respondingStatus = checkRespondingStatus(app.response)

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

      <IconContainer
        className={cn(
          respondingStatus !== "responding" && "text-muted-foreground",
        )}
        tooltipContent={"停止生成会话（仅限正在生成时使用）（TODO）"}
        disabled={respondingStatus !== "responding"}
        onClick={() => {
          void callLLM(
            {
              action: "interrupt",
              request: {
                requestId,
                appId: app.clientId,
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

      <IconContainer
        tooltipContent={"选中当前的App，每次发送问题时以它的上下文对齐"}
        onClick={() => {
          convStore.selectApp(app.clientId)
        }}
      >
        <LockOrNot className={cn(selected && "text-primary-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"删除一个App（注意，暂不可恢复）"}
        disabled={apps.length <= 1}
        className={cn(apps.length === 1 && "text-muted-foreground")}
        onClick={() => {
          void convStore.delApp(app.clientId)
        }}
      >
        <MinusCircleIcon />
      </IconContainer>

      {!isMobile && (
        <IconContainer
          tooltipContent={"添加一个App（聊天内容与被选中App同步）"}
          onClick={() => {
            convStore.forkApp(app)
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
