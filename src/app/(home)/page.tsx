"use client"
import { Container } from "@/components/containers"
import { BrandTitle } from "@/components/branding"
import { QueryInHomePage } from "@/components/query-in-home-page"
import { useSnapshot } from "valtio"
import { conversationStore } from "@/store/conversation"
import { SelectScenario } from "@/components/select-scenario"
import { Button } from "@/components/ui/button"
import { openSelectPApps } from "@/store/ui"
import JoinComponents from "@/components/join-components"
import { ChevronDownIcon } from "lucide-react"
import React from "react"
import { useSession } from "next-auth/react"

export default function HomePage() {
  const session = useSession()
  console.log("[HomePage]: ", { session })

  return (
    <Container
      id={"main-container"}
      orientation={"vertical"}
      className={"max-w-2xl grow sm:w-3/5 mx-auto flex flex-col justify-start"}
    >
      <div className={"h-1/3 flex flex-col justify-end mb-8"}>
        <BrandTitle />
      </div>

      {/*<TV />*/}

      <ConfigApp />

      <QueryInHomePage />
    </Container>
  )
}

const ConfigApp = () => {
  const { apps } = useSnapshot(conversationStore)

  return (
    <div className={"flex items-center gap-2"}>
      <SelectScenario />

      <Button variant={"outline"} onClick={openSelectPApps}>
        <span className={"text-muted-foreground"}>模型：</span>

        <JoinComponents
          components={apps.map((p) => (
            <span key={p.id}>{p.title}</span>
          ))}
          separator={
            <span className={"text-sm text-muted-foreground mx-1"}>vs</span>
          }
        />

        <ChevronDownIcon className={"w-4 h-4 text-muted-foreground ml-1"} />
      </Button>
      {/*<SelectPrompt/>*/}
    </div>
  )
}
