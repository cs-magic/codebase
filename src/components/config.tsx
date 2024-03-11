"use client"

import { useHotkeys } from "@mantine/hooks"
import { SettingsIcon } from "lucide-react"
import { useState } from "react"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../packages/common-ui/shadcn/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/sheet"
import { ConfigDevCard } from "./config-dev-card"
import { ConfigLLMCard } from "./config-llm"
import { ConfigLogCard } from "./config-log-card"
import { ConfigSMSCard } from "./config-sms"
import { ConfigTRPCCard } from "./config-trpc"

export const ConfigPanel = () => {
  const [open, setOpen] = useState(false)

  useHotkeys([
    [
      "shift+mod+P",
      () => {
        setOpen(true)
      },
    ],
  ])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={"fixed left-2 bottom-2"} asChild>
        <IconContainer>
          <SettingsIcon />
        </IconContainer>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <Tabs defaultValue={"llm"}>
          <TabsList className={"w-full "}>
            <TabsTrigger value={"llm"}>LLM</TabsTrigger>
            <TabsTrigger value={"sms"}>SMS</TabsTrigger>
            <TabsTrigger value={"log"}>LOG</TabsTrigger>
            <TabsTrigger value={"trpc"}>TRPC</TabsTrigger>
            <TabsTrigger value={"dev"}>DEV</TabsTrigger>
          </TabsList>

          <TabsContent value={"llm"}>
            <ConfigLLMCard />
          </TabsContent>

          <TabsContent value={"sms"}>
            <ConfigSMSCard />
          </TabsContent>

          <TabsContent value={"log"}>
            <ConfigLogCard />
          </TabsContent>

          <TabsContent value={"trpc"}>
            <ConfigTRPCCard />
          </TabsContent>

          <TabsContent value={"dev"}>
            <ConfigDevCard />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
