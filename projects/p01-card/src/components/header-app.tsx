import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { MSG_TODO } from "../../../common-common/messages"
import { AspectRatio } from "../../../common-ui-shadcn/components/aspect-ratio"

import { config } from "../config"

export interface ISubAppIcon {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  Cover?: string | React.VFC<React.SVGProps<SVGSVGElement>>
  title: string
  enabled?: boolean
}

export const SubAppIcon = ({ subAppIcon }: { subAppIcon: ISubAppIcon }) => {
  const { Cover, enabled } = subAppIcon
  return (
    <Link
      href={`/${subAppIcon.id}`}
      className={
        "w-24 flex flex-col gap-1 items-center rounded-lg p-2 interactive"
      }
      onClick={(event) => {
        if (!enabled) {
          event.preventDefault()
          toast.info(MSG_TODO)
        }
      }}
    >
      {/*<Text2TextApp className={"w-24 h-24"} />*/}
      <AspectRatio ratio={1}>
        {!Cover || typeof Cover === "string" ? (
          <Image
            src={Cover ?? config.website.avatar.default}
            alt={""}
            fill
            className={"object-cover rounded-lg"}
          />
        ) : (
          <Cover className={"object-cover"} />
        )}
      </AspectRatio>

      <div className={"text-sm"}>{subAppIcon.title}</div>
    </Link>
  )
}
