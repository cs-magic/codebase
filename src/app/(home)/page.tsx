"use client"
import { BrandTitle } from "@/components/branding"
import { QueryInHomePage } from "@/components/query-in-home-page"
import { ScenarioSelector } from "@/components/scenario-selector"
import { Button } from "../../../packages/common/components/ui/button"
import JoinComponents from "../../../packages/common/components/join-components"
import { ChevronDownIcon } from "lucide-react"
import React from "react"
import { useSession } from "next-auth/react"
import { Header } from "@/components/layout/header"
import { BrandingFooter } from "@/components/layout/footer"
import { useAtom } from "jotai"

import {
  persistedQueryConfigsAtom,
  uiSelectQueryConfigsDialogOpenAtom,
} from "@/store/query-config.atom"
import { FlexContainer } from "../../../packages/common/components/flex-container"

export default function HomePage() {
  const session = useSession()
  console.log("[HomePage]: ", { session })

  return (
    <>
      <Header />

      <div className={"grow flex flex-col justify-center items-center "}>
        <FlexContainer
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
        </FlexContainer>
      </div>

      <BrandingFooter />
    </>
  )
}

const ConfigApp = () => {
  const [queryConfigs] = useAtom(persistedQueryConfigsAtom)
  const [, setOpen] = useAtom(uiSelectQueryConfigsDialogOpenAtom)

  return (
    <div className={"flex items-center gap-2"}>
      <ScenarioSelector />

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
      {/*<PromptSelector/>*/}
    </div>
  )
}
