"use client"
import { Container } from "@/components/containers"
import { BrandTitle } from "@/components/branding"
import { QueryInHomePage } from "@/components/query-in-home-page"
import { SelectScenario } from "@/components/select-scenario"
import { Button } from "@/components/ui/button"
import JoinComponents from "@/components/join-components"
import { ChevronDownIcon } from "lucide-react"
import React from "react"
import { useSession } from "next-auth/react"
import { Header } from "@/components/layout/header"
import { BrandingFooter } from "@/components/layout/footer"
import { useAtom } from "jotai"

import {
  queryConfigsAtom,
  uiSelectQueryConfigsDialogOpenAtom,
} from "@/core/query-llm/store/query-config.atom"

export default function HomePage() {
  const session = useSession()
  console.log("[HomePage]: ", { session })

  return (
    <>
      <Header />

      <div className={"grow flex flex-col justify-center items-center "}>
        <Container
          id={"main-container"}
          orientation={"vertical"}
          className={
            "max-w-2xl grow sm:w-3/5 mx-auto flex flex-col justify-start"
          }
        >
          <div className={"h-1/3 flex flex-col justify-end mb-8"}>
            <BrandTitle />
          </div>

          {/*<TV />*/}

          <ConfigApp />

          <QueryInHomePage />
        </Container>
      </div>

      <BrandingFooter />
    </>
  )
}

const ConfigApp = () => {
  const [queryConfigs] = useAtom(queryConfigsAtom)
  const [, setOpen] = useAtom(uiSelectQueryConfigsDialogOpenAtom)

  return (
    <div className={"flex items-center gap-2"}>
      <SelectScenario />

      <Button variant={"outline"} onClick={() => setOpen(true)}>
        <span className={"text-muted-foreground"}>模型对比：</span>
        {!queryConfigs.length ? (
          "请选择"
        ) : (
          <JoinComponents
            components={queryConfigs.map((p) => (
              <span key={p.id}>{p.title}</span>
            ))}
            separator={
              <span className={"text-sm text-muted-foreground mx-1"}>vs</span>
            }
          />
        )}

        <ChevronDownIcon className={"w-4 h-4 text-muted-foreground ml-1"} />
      </Button>
      {/*<SelectPrompt/>*/}
    </div>
  )
}
