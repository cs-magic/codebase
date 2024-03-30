import { LucideIcon } from "lucide-react"

export const StatItem = ({
  Icon,
  value,
}: {
  Icon: LucideIcon
  value: number
}) => {
  const v =
    value >= 1e5
      ? "10w+"
      : value >= 1e4
        ? `${Math.floor(value / 1e4)}w+`
        : value >= 1e3
          ? `${Math.floor(value / 1e3)}k+`
          : value

  return (
    <div className={"flex flex-col items-center w-8"}>
      <Icon className={"w-8"} />
      <span className={"text-muted-foreground"}>{v}</span>
    </div>
  )
}
