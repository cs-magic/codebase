import { Fragment } from "react"
import { Separator } from "@/components/ui/separator"
import { PAppComp } from "@/components/p-app"
import { IPAppClient } from "@/store/conversation"
import { conversationStore } from "@/store/conversation-v2"

export const PAppsComp = () => {
  const { persistedPApps, conversations, currentConversationId } =
    conversationStore.state
  const pApps = currentConversationId
    ? conversations.find((c) => c.id === currentConversationId)!.pApps
    : persistedPApps

  return (
    <div className={"grow overflow-auto flex gap-1 justify-center"}>
      {pApps.map((pApp) => (
        <Fragment key={pApp.id}>
          <PAppComp pApp={pApp} />
          <Separator orientation={"vertical"} className={"last:hidden"} />
        </Fragment>
      ))}
    </div>
  )
}
