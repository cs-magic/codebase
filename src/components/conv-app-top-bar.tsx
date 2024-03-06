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
import { IconContainer } from "../../packages/common/components/icon-container"
import { cn } from "../../packages/common/lib/utils"
import { IAppDetail } from "../schema/app.detail"
import { checkRespondingAtom } from "../store/conv"
import { ConvAppTitleLine } from "./conv-app-title-line"

export const ConvAppTopBar = ({ app }: { app: IAppDetail }) => {
  const [, forkApp] = useAtom(forkAppAtom)
  const [, delApp] = useAtom(delAppAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [selectedAppID, setSelectedAppID] = useAtom(appIdPersistedAtom)
  const [checkResponding] = useAtom(checkRespondingAtom)
  const [, stopGenerating] = useAtom(stopGeneratingAtom)

  const { id: appId } = app
  const selected = appId === selectedAppID
  const LockOrNot = selected ? Lock : Unlock
  const fetching = checkResponding(appId)

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
        tooltipContent={"停止生成会话（仅限正在生成时使用）（TODO）"}
        onClick={() => {
          stopGenerating(true)
        }}
      >
        <StopCircle className={cn(!fetching && "text-muted-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"选中当前的App，每次发送问题时以它的上下文对齐"}
        onClick={() => {
          setSelectedAppID(appId)
        }}
      >
        <LockOrNot className={cn(selected && "text-primary-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"删除一个App（注意，暂不可恢复）"}
        className={cn(persistedApps.length === 1 && "text-muted-foreground")}
        onClick={() => {
          void delApp(appId)
        }}
      >
        <MinusCircleIcon />
      </IconContainer>

      <IconContainer
        tooltipContent={"添加一个App（聊天内容与被选中App同步）"}
        onClick={() => {
          forkApp(app.id)
        }}
      >
        <PlusCircleIcon />
      </IconContainer>

      <IconContainer tooltipContent={"设置App（TODO）"}>
        <SettingsIcon />
      </IconContainer>
    </div>
  )
}
