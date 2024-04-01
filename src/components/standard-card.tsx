import { PropsWithChildren } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../packages/common-ui-shadcn/components/card"
import { cn } from "../../packages/common-ui-shadcn/utils"

export const StandardCard = ({
  title,
  children,
  type = "normal",
}: {
  title: string
  type?: "normal" | "beauty"
} & PropsWithChildren) => {
  return (
    <Card className={cn("w-full", type === "beauty" && "border-none")}>
      <CardHeader className={cn(type === "beauty" && "p-2")}>
        <CardTitle
          className={cn(type === "beauty" && "text-primary-foreground")}
        >
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent
        className={cn("flex flex-col gap-4", type === "beauty" && "p-2")}
      >
        {children}
      </CardContent>
    </Card>
  )
}
