"use client"
import { useSession } from "next-auth/react"
import { useRef } from "react"
import { toast } from "sonner"
import { FlexContainer } from "../../../../../packages/common/components/flex-container"
import { Button } from "../../../../../packages/common/components/ui/button"
import { Input } from "../../../../../packages/common/components/ui/input"
import { Label } from "../../../../../packages/common/components/ui/label"
import { api } from "../../../../../packages/common/lib/trpc/react"
import { updateUserNameViaTrpc } from "./actions"

export default function TestTrpcRouterInClientPage() {
  const userId = useSession().data?.user.id

  const utils = api.useUtils()
  const { data: user } = api.core.getSelf.useQuery()

  const refName = useRef<HTMLInputElement>(null)

  const update = async (method: "db" | "trpc") => {
    if (!userId) return
    if (!refName.current) return
    const newName = refName.current.value
    if (!newName) return

    if (method === "db") {
      await updateUserNameViaTrpc(userId, newName)
      void utils.core.getSelf.invalidate()
    } else {
      // const router = protectedProcedure
      //   .input(z.object({ name: z.string() }))
      //   .mutation(async ({ ctx, input }) => {
      //     await ctx.db.user.update({
      //       where: { id: ctx.user.id },
      //       data: { name: input.name },
      //     })
      //   })
      toast.error("router not supported directly call")
    }
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

      <Button onClick={async () => update("db")}>提交修改（db）</Button>

      <Button onClick={async () => update("trpc")}>提交修改（trpc）</Button>
    </FlexContainer>
  )
}
