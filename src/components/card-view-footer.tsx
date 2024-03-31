import { cn } from "../../packages/common-ui-shadcn/utils"

export const CardFooter = () => {
  return (
    <div
      className={cn(
        // "h-16",
        "shrink-0 flex justify-center items-center p-2",
        // "text-slate-500",
      )}
    >
      {/*标题/思维导图由 <span className={"font-medium mx-1"}>Kimi大模型</span>生成*/}
      <p className={cn("primary-gradient", " font-art text-xs leading-8")}>
        Inspire Your Day
      </p>
    </div>
  )
}
