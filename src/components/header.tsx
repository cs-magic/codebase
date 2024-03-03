"use client"
import { IoApps } from "react-icons/io5"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../packages/common/components/ui/dropdown-menu"
import Image from "next/image"
import {
  DEFAULT_AVATAR,
  Text2ImageAppSVG,
  Text2TextAppSVG,
} from "@/config/assets"
import { AspectRatio } from "../../packages/common/components/ui/aspect-ratio"
import { BrandTitle } from "@/components/branding"
import Link from "next/link"
import { cn } from "../../packages/common/lib/utils"
import { Button } from "../../packages/common/components/ui/button"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { CircleUser } from "lucide-react"
import { IconContainer } from "../../packages/common/components/icon-container"

export const UserButton = () => {
  const session = useSession()
  const user = session.data?.user

  return (
    <Link href={user ? "/dashboard" : "/auth"}>
      <IconContainer size={"lg"}>
        <CircleUser className={cn(user && "text-primary-foreground")} />
      </IconContainer>
    </Link>
  )
}
export const Header = ({ withBrand }: { withBrand?: boolean }) => {
  return (
    <div className={"w-full flex gap-2 px-6 py-4"}>
      {withBrand && <BrandTitle className={"text-2xl"} withDescription />}

      <div className={"ml-auto flex items-center gap-2"}>
        <Apps />

        <UserButton />
      </div>
    </div>
  )
}

const Apps = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconContainer size={"lg"}>
          <IoApps />
        </IconContainer>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={"mr-2 p-4 flex flex-col gap-4 max-h-[480px] overflow-auto"}
      >
        <div
          className={cn(
            "grid",
            subAppsIcons.length >= 3 ? "grid-cols-3" : "grid-cols-2",
          )}
        >
          {subAppsIcons.map((subApp, index) => (
            <SubAppIcon subAppIcon={subApp} key={index} />
          ))}
        </div>

        <Button
          variant={"outline"}
          className={"w-full"}
          onClick={() => {
            toast.info("敬请期待！")
          }}
        >
          查看CS魔法社的更多产品
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface ISubAppIcon {
  id: string
  fromMode: ModeType
  toMode: ModeType
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  Cover?: string | React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SubAppIcon = ({ subAppIcon }: { subAppIcon: ISubAppIcon }) => {
  const { fromMode, toMode, Cover } = subAppIcon
  return (
    <Link
      href={`/${subAppIcon.id}`}
      className={
        "w-24 flex flex-col gap-1 items-center rounded-lg p-2 interactive"
      }
    >
      {/*<Text2TextApp className={"w-24 h-24"} />*/}
      <AspectRatio ratio={1}>
        {!Cover || typeof Cover === "string" ? (
          <Image
            src={Cover ?? DEFAULT_AVATAR}
            alt={""}
            fill
            className={"object-cover rounded-lg"}
          />
        ) : (
          <Cover className={"object-cover"} />
        )}
      </AspectRatio>

      <div
        className={"text-sm"}
      >{`${modes[fromMode].label} -> ${modes[toMode].label}`}</div>
    </Link>
  )
}

export type ModeType = "text" | "image" | "sound" | "video"
export type IMode = { label: string; id: ModeType }
export const modes: Record<ModeType, IMode> = {
  text: { id: "text", label: "文" },
  image: { id: "image", label: "图" },
  sound: { id: "sound", label: "音" },
  video: { id: "video", label: "视频" },
}
/**
 * todo: images
 */
export const subAppsIcons: ISubAppIcon[] = [
  { id: "tt", fromMode: "text", toMode: "text", Cover: Text2TextAppSVG },
  { id: "ti", fromMode: "text", toMode: "image", Cover: Text2ImageAppSVG },
  // { fromMode: "image", toMode: "text" },
  // { fromMode: "text", toMode: "sound" },
  // { fromMode: "image", toMode: "sound" },
  // { fromMode: "sound", toMode: "text" },
  // { fromMode: "sound", toMode: "image" },
  // { fromMode: "text", toMode: "video" },
  // { fromMode: "image", toMode: "video" },
  // { fromMode: "sound", toMode: "video" },
  // { fromMode: "video", toMode: "text" },
  // { fromMode: "video", toMode: "image" },
  // { fromMode: "video", toMode: "sound" },
  // { fromMode: "video", toMode: "video" },
]
