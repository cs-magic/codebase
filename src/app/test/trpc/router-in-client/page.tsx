"use client"
import { useSession } from "next-auth/react"
import { useRef } from "react"
import { toast } from "sonner"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Button } from "../../../../../packages/common-ui/shadcn/shadcn-components/button"
import { Input } from "../../../../../packages/common-ui/shadcn/shadcn-components/input"
import { Label } from "../../../../../packages/common-ui/shadcn/shadcn-components/label"
import { api } from "../../../../../packages/common-trpc/react"
import { updateUserNameViaTrpc } from "./actions"

export default function TestTrpcRouterInClientPage() {
  const userId = useSession().data?.user.id

  const utils = api.useUtils()
  const { data: user } = api.core.getSelf.useQuery()
  const updateUser = api.core.updateSelf.useMutation()

  const refName = useRef<HTMLInputElement>(null)
  const refId = useRef<HTMLInputElement>(null)

  const updateName = async (method: "db" | "trpc") => {
    if (!userId) return
    if (!refName.current) return
    const newName = refName.current.value
    if (!newName) return

    if (method === "db") {
      await updateUserNameViaTrpc(userId, newName)
    } else {
      await updateUser.mutateAsync({ name: newName })
    }
    void utils.core.getSelf.invalidate()
  }

  const updateId = async () => {
    if (!userId) return
    if (!refId.current) return
    const newId = refId.current.value
    if (!newId) return

    await updateUser.mutateAsync({ id: newId })
    void utils.core.getSelf.invalidate()
  }

  return (
    <FlexContainer orientation={"vertical"}>
      <Label>Profile</Label>

      <div>id: {user?.id}</div>

      <div>name: {user?.name}</div>

      <div>
        new name:
        <Input ref={refName} />
      </div>

      <div>
        new id:
        <Input ref={refId} />
      </div>

      <Button onClick={async () => updateName("db")}>提交修改（db）</Button>

      <Button onClick={async () => updateName("trpc")}>提交修改（trpc）</Button>

      <Button onClick={async () => updateId()}>提交修改（id）</Button>
    </FlexContainer>
  )
}
