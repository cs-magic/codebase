import {
  appIdPersistedAtom,
  appsPersistedAtom,
  delAppAtom,
  uiSelectAppsDialogOpenAtom,
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
import { checkRespondingAtom } from "../store/conv"

export const ConvAppTopBar = ({
  appId,
  title,
}: {
  appId: string
  title: string
}) => {
  const [, delApp] = useAtom(delAppAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [selectedAppID, setSelectedAppID] = useAtom(appIdPersistedAtom)
  const [, setOpen] = useAtom(uiSelectAppsDialogOpenAtom)

  const selected = appId === selectedAppID
  const LockOrNot = selected ? Lock : Unlock
  const [checkResponding] = useAtom(checkRespondingAtom)
  const fetching = checkResponding(appId)

  return (
    <div
      className={cn(
        "w-full overflow-hidden flex items-center p-2 border-b ",
        "shrink-0",
        selected && "border-b border-primary-foreground/50",
      )}
    >
      <div className={"flex items-center gap-2 overflow-hidden"}>
        <div className={"w-full flex gap-2 items-baseline"}>
          <span className={"truncate"}>{title}</span>

          <span className={"text-muted-foreground text-xs"}>{appId}</span>
        </div>
      </div>
      <div className={"grow"} />

      <IconContainer
        tooltipContent={"选中当前的App，每次发送问题时以它的上下文对齐"}
        onClick={() => {
          setSelectedAppID(appId)
        }}
      >
        <LockOrNot className={cn(selected && "text-primary-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"停止生成会话（仅限正在生成时使用）（TODO）"}
        onClick={() => {
          // selectPApp(appId)
        }}
      >
        <StopCircle className={cn(!fetching && "text-muted-foreground")} />
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
        onClick={() => setOpen(true)}
      >
        <PlusCircleIcon />
      </IconContainer>

      <IconContainer tooltipContent={"设置App（TODO）"}>
        <SettingsIcon />
      </IconContainer>
    </div>
  )
}
