import { useAtom } from "jotai"
import { delAppAtom, uiSelectAppsDialogOpenAtom } from "@/store/app.atom"
import { useSnapshot } from "valtio"
import { conversationStore } from "@/store/conv.valtio"
import {
  Lock,
  MinusCircleIcon,
  PlusCircleIcon,
  SettingsIcon,
  StopCircle,
  Unlock,
} from "lucide-react"
import { cn } from "../../packages/common/lib/utils"
import { IconContainer } from "../../packages/common/components/icon-container"

export const TopBar = ({
  queryConfigId,
  title,
  fetching,
}: {
  queryConfigId: string
  title: string
  fetching: boolean
}) => {
  const [, delQueryConfig] = useAtom(delAppAtom)
  const { apps, curPApp } = useSnapshot(conversationStore)
  const selected = queryConfigId === curPApp?.id
  const LockOrNot = selected ? Lock : Unlock
  // console.log({ appId, currentPAppId })
  const [, setOpen] = useAtom(uiSelectAppsDialogOpenAtom)

  return (
    <div
      className={cn(
        "w-full overflow-hidden flex items-center p-2 border-b",
        selected && "border-b border-primary-foreground/50",
      )}
    >
      <div className={"flex items-center gap-2 overflow-hidden"}>
        <div className={"w-full flex gap-2 items-baseline"}>
          <span className={"truncate"}>{title}</span>

          <span className={"text-muted-foreground text-xs"}>
            {queryConfigId}
          </span>
        </div>
      </div>
      <div className={"grow"} />

      <IconContainer
        tooltipContent={"选中当前的App，每次发送问题时以它的上下文对齐"}
        onClick={() => {
          //   todo: switch persisted app
          // selectPApp(apps.find((p) => p.id === queryConfigId)!)
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
        className={cn(apps.length === 1 && "text-muted-foreground")}
        onClick={() => {
          void delQueryConfig(queryConfigId)
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
