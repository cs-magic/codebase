"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../packages/common/components/ui/dropdown-menu"
import { IconContainer } from "../../packages/common/components/icon-container"
import { IoApps } from "react-icons/io5"
import { cn } from "../../packages/common/lib/utils"
import { Button } from "../../packages/common/components/ui/button"
import { toast } from "sonner"
import { SubAppIcon } from "@/components/header-app"
import { subAppsIcons } from "@/config/system"

export const Apps = () => {
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

        {/*<Button*/}
        {/*  variant={"outline"}*/}
        {/*  className={"w-full"}*/}
        {/*  onClick={() => {*/}
        {/*    toast.info("敬请期待！")*/}
        {/*  }}*/}
        {/*>*/}
        {/*  查看CS魔法社的更多产品*/}
        {/*</Button>*/}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
