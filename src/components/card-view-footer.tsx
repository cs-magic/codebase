import { useAtom } from "jotai"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { cardAtom } from "../store/card.atom"

export const CardFooter = () => {
  const [card] = useAtom(cardAtom)

  return (
    <div
      className={cn(
        // "h-16",
        "shrink-0 relative p-2",
        // "text-slate-500",
      )}
    >
      <div className={"flex justify-center items-center"}>
        {/*标题/思维导图由 <span className={"font-medium mx-1"}>Kimi大模型</span>生成*/}
        <p className={cn("primary-gradient", " font-art text-xs leading-8")}>
          Inspire Your Day
        </p>
      </div>

      <div className={"absolute right-2 bottom-2 text-white/50 text-[8px]"}>
        <div>{card?.id}</div>
        <div>V0.1.0(α)</div>
      </div>
    </div>
  )
}
