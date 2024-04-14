import { Badge } from "../../../common-ui-shadcn/components/ui/badge"
import { cn } from "../../../common-ui-shadcn/utils"

export const Tags = ({ tags }: { tags: string[] | null | undefined }) => {
  if (!tags?.length) return null

  return (
    <div className={"flex items-center flex-wrap gap-0"}>
      {tags.slice(0, 3).map((tag) => (
        <Badge
          className={cn(
            "text-nowrap",
            "bg-transparent",
            // "px-0"
            // "bg-muted"
          )}
          key={tag}
        >
          #{tag}
        </Badge>
      ))}
    </div>
  )
}
