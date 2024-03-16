import * as process from "process"
import { useState } from "react"
import { devEnabledAtom } from "../../packages/common-dev/store"
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
import { cn } from "../../packages/common-ui/shadcn/utils"
import { ConfigDevCard } from "./config-dev-card"
import { ConfigLLMCard } from "./config-llm"
import { ConfigLogCard } from "./config-log-card"
import { ConfigSMSCard } from "./config-sms"
import { ConfigTRPCCard } from "./config-trpc"

import { useHotkeys } from "@mantine/hooks"
import { SettingsIcon } from "lucide-react"
import { useAtom } from "jotai"
import { UserSignOutButton } from "./user-sign-out-button"

export const DevConfig = () => {
  const [devEnabled] = useAtom(devEnabledAtom)

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
      <SheetTrigger
        className={cn(
          "fixed left-2 bottom-2",
          process.env.NODE_ENV === "production" && !devEnabled && "hidden",
        )}
        asChild
      >
        <IconContainer>
          <SettingsIcon />
        </IconContainer>
      </SheetTrigger>

      <SheetContent side={"left"} className={"w-screen sm:max-w-[480px]"}>
        <Tabs defaultValue={"llm"}>
          <TabsList className={"w-full "}>
            <TabsTrigger value={"auth"}>Auth</TabsTrigger>
            <TabsTrigger value={"llm"}>LLM</TabsTrigger>
            <TabsTrigger value={"sms"}>SMS</TabsTrigger>
            <TabsTrigger value={"log"}>LOG</TabsTrigger>
            <TabsTrigger value={"trpc"}>TRPC</TabsTrigger>
            <TabsTrigger value={"dev"}>DEV</TabsTrigger>
          </TabsList>

          <TabsContent value={"auth"}>
            <UserSignOutButton />
          </TabsContent>

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
