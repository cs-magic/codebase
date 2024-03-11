import { useSnapshot } from "valtio"
import { coreStore } from "../store/core.valtio"
import { SidebarConv } from "./sidebar-conv"

export const SidebarConvs = () => {
  const { convs } = useSnapshot(coreStore)

  return (
    <>
      {convs.map((conv) => (
        <SidebarConv conv={conv} key={conv.id} />
      ))}
    </>
  )
}
