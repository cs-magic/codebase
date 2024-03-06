"use client"
import { useSession } from "next-auth/react"
import { useRef } from "react"
import { FlexContainer } from "../../../../../packages/common/components/flex-container"
import { Button } from "../../../../../packages/common/components/ui/button"
import { Input } from "../../../../../packages/common/components/ui/input"
import { Label } from "../../../../../packages/common/components/ui/label"
import { api } from "../../../../../packages/common/lib/trpc/react"
import { updateUserNameNormal } from "./actions"

export default function TestTrpcRouterInClientPage() {
  const userId = useSession().data?.user.id

  const utils = api.useUtils()
  const { data: user } = api.core.getSelf.useQuery()

  const refName = useRef<HTMLInputElement>(null)

  return (
    <FlexContainer orientation={"vertical"}>
      <Label>Profile</Label>

      <div>id: {user?.id}</div>

      <div>name: {user?.name}</div>

      <div>
        new name:
        <Input ref={refName} />
      </div>
      <Button
        onClick={async () => {
          if (!userId) return
          if (!refName.current) return
          const newName = refName.current.value
          if (!newName) return
          await updateUserNameNormal(userId, newName)
          void utils.core.getSelf.invalidate()
        }}
      >
        提交修改（db）
      </Button>
    </FlexContainer>
  )
}
