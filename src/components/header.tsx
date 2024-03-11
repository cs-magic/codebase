"use client"

import { BrandingTitle } from "@/components/branding-title"
import { Apps } from "@/components/header-apps"
import { UserButton } from "@/components/header-user"
import { useAtom } from "jotai"
import { MenuIcon } from "lucide-react"
import { useWindowSize } from "react-use"
import { useSnapshot } from "valtio"
import {
  uiInnerHeight,
  uiScreenAtom,
  uiViewportHeight,
} from "../../packages/common-ui/store"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/sheet"
import { coreStore } from "../store/core.valtio"
import { Sidebar } from "./sidebar"

export const Header = () => {
  const [vh] = useAtom(uiViewportHeight)
  const [sh] = useAtom(uiScreenAtom)
  const [ih] = useAtom(uiInnerHeight)
  const { height: wh } = useWindowSize()

  const { title } = useSnapshot(coreStore)

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

      <div className={"block grow sm:hidden justify-center truncate max-w-1/2"}>
        {title}
      </div>

      <div className={"ml-auto shrink-0 flex items-center gap-2"}>
        <Apps />

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
