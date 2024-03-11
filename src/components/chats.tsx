"use client"

import { useAtom } from "jotai"
import { ScopeProvider } from "jotai-scope"
import { useSnapshot } from "valtio"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { uiScreenAtom } from "../../packages/common-ui/store"
import { coreStore } from "../store/core.valtio"

import { appStopGeneratingScopeAtom } from "../store/system.atom"
import { getAppsGridCols } from "../utils"
import { Chat } from "./chat"

export const Chats = () => {
  const [{ width }] = useAtom(uiScreenAtom)
  const { chats } = useSnapshot(coreStore)

  console.log("-- chats: ", chats)

  return (
    <div
      className={cn(
        "w-full grow overflow-hidden grid",
        //  自动均分行高：https://chat.openai.com/c/3c92ed30-59a9-42e1-8740-49710fca05ca
        "auto-rows-fr",
      )}
      style={{
        // ref: https://tailwindcss.com/docs/grid-template-columns
        gridTemplateColumns: `repeat(${getAppsGridCols(width, chats.length)}, minmax(0, 1fr))`,
      }}
    >
      {chats.map((chat, index) => (
        // 不要用app.id会重复！
        <ScopeProvider key={index} atoms={[appStopGeneratingScopeAtom]}>
          <Chat chat={chat} />
        </ScopeProvider>
      ))}
    </div>
  )
}
