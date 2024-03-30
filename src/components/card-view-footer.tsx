import { cn } from "../../packages/common-ui-shadcn/utils"

export const CardFooter = () => {
  return (
    <div
      className={cn(
        // "h-16",
        "shrink-0 flex justify-center items-center text-slate-500 py-2",
      )}
    >
      {/*标题/思维导图由 <span className={"font-medium mx-1"}>Kimi大模型</span>生成*/}
      {/*未经审视的人生不值得一过*/}
      Inspire Your Day
    </div>
  )
}
