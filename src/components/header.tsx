"use client"

import { BrandingTitle } from "@/components/branding-title"
import { Apps } from "@/components/header-apps"
import { UserButton } from "@/components/header-user"
import { MenuIcon } from "lucide-react"
import { IconContainer } from "../../packages/common/components/icon-container"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../packages/common/components/ui/sheet"
import { Sidebar } from "./sidebar"

export const Header = () => {
  return (
    <div className={"shrink-0 w-full flex gap-2 px-6 py-4"}>
      <div className={"flex items-center"}>
        <Sheet>
          <SheetTrigger asChild>
            <IconContainer
              className={"sm:hidden mr-2 text-primary-foreground w-8 h-8"}
            >
              <MenuIcon />
            </IconContainer>
          </SheetTrigger>

          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>会话列表</SheetTitle>
            </SheetHeader>

            <Sidebar className={"flex"} />
          </SheetContent>
        </Sheet>

        <BrandingTitle className={"text-2xl"} withDescription />
      </div>

      <div className={"grow"} />

      <div className={"ml-auto shrink-0 flex items-center gap-2"}>
        <Apps />

        <UserButton />
      </div>
    </div>
  )
}
