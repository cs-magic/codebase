"use client"

import { BrandingTitle } from "@/components/branding-title"
import { UserButton } from "@/components/header-user"
import { MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../packages/common-ui-shadcn/components/sheet"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { Sidebar } from "./sidebar"

export const Header = () => {
  return (
    <div
      className={
        "shrink-0 w-full flex gap-2 px-6 py-4 items-center justify-between"
      }
    >
      <div className={"flex items-center"}>
        <MobileConversations />

        <BrandingTitle className={"text-2xl"} withDescription />
      </div>

      <div className={"ml-auto shrink-0 flex items-center gap-2"}>
        {/*<Apps />*/}

        <UserButton />
      </div>
    </div>
  )
}

const MobileConversations = () => (
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
)
