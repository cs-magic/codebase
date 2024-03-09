"use client"

import { convLogLevelAtom } from "@/store/conv"
import { useAtom } from "jotai"
import { SettingsIcon } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "packages/common-ui/shadcn/components/ui/tabs"
import { PropsWithChildren, ReactNode } from "react"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { llmDelayAtom } from "../../packages/common-llm/store"
import { LogLevel } from "../../packages/common-log/schema"
import { PusherServerId } from "../../packages/common-puser/config"
import {
  pusherLogLevelAtom,
  pusherServerIdAtom,
} from "../../packages/common-puser/store"
import { SmsProviderType } from "../../packages/common-sms/schema"
import {
  smsCodeToCountdownSecondsAtom,
  smsProviderTypeAtom,
} from "../../packages/common-sms/store"
import { api } from "../../packages/common-trpc/react"
import { trpcReactLogEnabledAtom } from "../../packages/common-trpc/store"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../packages/common-ui/shadcn/shadcn-components/card"
import { Input } from "../../packages/common-ui/shadcn/shadcn-components/input"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../packages/common-ui/shadcn/shadcn-components/select"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/sheet"
import { Switch } from "../../packages/common-ui/shadcn/shadcn-components/switch"
import { TransportType, transportTypeAtom } from "../store/query"

export const Devtool = () => {
  return (
    <Sheet>
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

export const ConfigDevCard = () => {
  const [devEnabled, setDevEnabled] = useAtom(devEnabledAtom)

  return (
    <ConfigCard title={"Dev"}>
      <LabelLine title={"Dev Enabled"}>
        <Switch checked={devEnabled} onCheckedChange={setDevEnabled} />
      </LabelLine>
    </ConfigCard>
  )
}

export const ConfigSMSCard = () => {
  const [smsProvider, setSmsProvider] = useAtom(smsProviderTypeAtom)
  const [smsCountdownSeconds, setSmsCountdownSeconds] = useAtom(
    smsCodeToCountdownSecondsAtom,
  )
  return (
    <ConfigCard title={"SMS"}>
      <Label>Provider Type</Label>
      <Select
        value={smsProvider}
        onValueChange={(s: SmsProviderType) => setSmsProvider(s)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"ali" as SmsProviderType}>
              计算机魔法研究（阿里，无白名单）
            </SelectItem>
            <SelectItem value={"tencent" as SmsProviderType}>
              XX的个人博客（腾讯，白名单）
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Countdown Time</Label>
      <Input
        value={smsCountdownSeconds}
        onChange={(event) =>
          setSmsCountdownSeconds(Number(event.currentTarget.value))
        }
        type={"number"}
      />
    </ConfigCard>
  )
}

export const ConfigLLMCard = () => {
  const [llmDelay, setLlmDelay] = useAtom(llmDelayAtom)
  const [transportType, setTransportType] = useAtom(transportTypeAtom)
  const [pusherServerId, setPusherServerId] = useAtom(pusherServerIdAtom)

  return (
    <ConfigCard title={"LLM"}>
      <LabelLine title={"Delay(ms)"}>
        <Input
          value={llmDelay}
          type={"number"}
          onChange={(event) => {
            setLlmDelay(Number(event.currentTarget.value))
          }}
        />
      </LabelLine>

      <Label>Transport Type</Label>
      <Select
        value={transportType}
        onValueChange={(s: TransportType) => setTransportType(s)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"pusher" as TransportType}>Puhser</SelectItem>
            <SelectItem value={"sse" as TransportType}>SSE</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Pusher Server ID</Label>
      <Select
        value={pusherServerId}
        onValueChange={(s: PusherServerId) => setPusherServerId(s)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"aws" as PusherServerId}>Ali</SelectItem>
            <SelectItem value={"tencent_ws" as PusherServerId}>
              tencent-ws
            </SelectItem>
            <SelectItem value={"tencent_wss" as PusherServerId}>
              tencent-wss
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </ConfigCard>
  )
}

export const LabelLine = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className={"w-full flex items-center justify-between gap-2"}>
      <Label className={"w-32 truncate shrink-0"}>{title}</Label>
      {children}
    </div>
  )
}

export const ConfigTRPCCard = () => {
  const [trpcReactLogEnabled, setTrpcReactLogEnabled] = useAtom(
    trpcReactLogEnabledAtom,
  )
  const utils = api.useUtils()

  return (
    <ConfigCard title={"TRPC"}>
      <LabelLine title={"React Log Enabled"}>
        <Switch
          checked={trpcReactLogEnabled}
          onCheckedChange={setTrpcReactLogEnabled}
        />
      </LabelLine>

      <LabelLine title={"Invalidate ALL"}>
        <Button
          onClick={() => {
            utils.invalidate()
          }}
        >
          Invalidate
        </Button>
      </LabelLine>
    </ConfigCard>
  )
}

export const ConfigCard = ({
  title,
  children,
}: { title: string } & PropsWithChildren) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className={"flex flex-col gap-4"}>{children}</CardContent>
    </Card>
  )
}

export const ConfigLogCard = () => {
  const [convLogLevel, setConvLogLevel] = useAtom(convLogLevelAtom)
  const [pusherLogLevel, setPusherLogLevel] = useAtom(pusherLogLevelAtom)

  return (
    <ConfigCard title={"log"}>
      <Label>Conv Log Level: </Label>
      <SelectLogLevel value={convLogLevel} setValue={setConvLogLevel} />

      <Label>Pusher Log Level: </Label>
      <SelectLogLevel value={pusherLogLevel} setValue={setPusherLogLevel} />
    </ConfigCard>
  )
}

export const SelectLogLevel = (props: {
  value: LogLevel
  setValue: (v: LogLevel) => void
}) => {
  return (
    <Select
      value={props.value.toString()}
      onValueChange={(v) => props.setValue(Number(v) as LogLevel)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value={"1"}>Verbose</SelectItem>
          <SelectItem value={"2"}>Debug</SelectItem>
          <SelectItem value={"3"}>Info</SelectItem>
          <SelectItem value={"4"}>Warning</SelectItem>
          <SelectItem value={"5"}>Error</SelectItem>
          <SelectItem value={"6"}>Critical</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
