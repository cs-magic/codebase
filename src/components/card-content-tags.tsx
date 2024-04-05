import { Badge } from "../../packages/common-ui-shadcn/components/ui/badge"

export const Tags = ({ tags }: { tags: string[] | null | undefined }) => {
  if (!tags?.length) return null

  return (
    <div className={"flex items-center"}>
      {tags.map((tag) => (
        <Badge className={"text-nowrap bg-transparent"} key={tag}>
          #{tag}
        </Badge>
      ))}
    </div>
  )
}
