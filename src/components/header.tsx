"use client"

import { BrandingTitle } from "@/components/branding-title"
import { UserButton } from "@/components/header-user"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "packages/common-ui-shadcn/components/ui/navigation-menu"
import { cn } from "packages/common-ui-shadcn/utils"
import React, { PropsWithChildren } from "react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../packages/common-ui-shadcn/components/sheet"
import { IconContainer } from "../../packages/common-ui/components/icon-container"

const Menus = () => (
  <>
    <LinkItem href={"/card/new"}>新建卡片</LinkItem>
    <LinkItem href={"/card/fgen"}>渲染卡片</LinkItem>
    {/*<LinkItem href={"/card/bgen"}>渲染卡片（后端）</LinkItem>*/}
  </>
)

export const Header = () => {
  return (
    <div
      className={
        "shrink-0 w-full flex gap-2 px-6 py-4 items-center justify-between"
      }
    >
      <div className={"flex items-center"}>
        <MobileConversations />
        <BrandingTitle withDescription />
      </div>

      <NavigationMenu className={"hidden sm:flex"}>
        <NavigationMenuList>
          <Menus />
        </NavigationMenuList>
      </NavigationMenu>

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
      <NavigationMenu>
        <NavigationMenuList className={"flex-col"}>
          <Menus />
        </NavigationMenuList>
      </NavigationMenu>
    </SheetContent>
  </Sheet>
)

const LinkItem = ({ href, children }: { href: string } & PropsWithChildren) => {
  return (
    <NavigationMenuItem className={"w-full"}>
      <Link href={href} legacyBehavior passHref className={"w-full"}>
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), "w-full text-nowrap")}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}
