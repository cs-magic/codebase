import { EyeIcon, HeartIcon, MessageSquareTextIcon } from "lucide-react"
import { StatItem } from "../../../../packages/ui/components/stat-item"
import { ICardStat } from "../schema/card"

export const Stat = ({ stat }: { stat: ICardStat | null | undefined }) => {
  if (!stat) return null
  return (
    <div className={"flex items-center gap-2"}>
      <StatItem Icon={EyeIcon} value={stat.reads} />
      <StatItem Icon={HeartIcon} value={stat.likes} />
      <StatItem Icon={MessageSquareTextIcon} value={stat.comments} />
    </div>
  )
}
