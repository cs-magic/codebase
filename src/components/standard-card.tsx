import { PropsWithChildren } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../packages/common-ui-shadcn/components/card"

export const StandardCard = ({
  title,
  children,
}: { title: string } & PropsWithChildren) => {
  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className={"flex flex-col gap-4"}>{children}</CardContent>
    </Card>
  )
}
