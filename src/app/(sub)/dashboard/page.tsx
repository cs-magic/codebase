"use client"
import { EditIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container"
import { Button } from "../../../../packages/common-ui/shadcn/shadcn-components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../../../packages/common-ui/shadcn/shadcn-components/card"
import { Label } from "../../../../packages/common-ui/shadcn/shadcn-components/label"
import { useDraftSession } from "../../../../packages/common-hooks/use-user-draft-session"
import { useUserUpdateProfile } from "../../../../packages/common-hooks/use-user-update-profile"
import { UserInputAvatar } from "../../../components/user-input-avatar"
import { UserInputName } from "../../../components/user-input-name"
import { UserSignOutButton } from "../../../components/user-sign-out-button"

export default function DashboardPage() {
  const session = useSession()
  const user = session.data?.user
  const { value: name, changed: nameChanged } = useDraftSession("name")
  const { changed: imageChanged } = useDraftSession("image")

  const updateProfile = useUserUpdateProfile()

  const [nameEditable, setNameEditable] = useState(false)

  useEffect(() => {
    if (!nameChanged) setNameEditable(false)
  }, [nameChanged])

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"!gap-8 mx-auto w-full max-w-[480px]"}
    >
      <Card className={"text-foreground w-full"}>
        <CardHeader>基本信息</CardHeader>

        <CardContent>
          <div className={"w-full flex gap-4"}>
            <UserInputAvatar />

            <div className={"grow flex flex-col gap-2 justify-center"}>
              <div className={"h-8"}>
                {!nameEditable ? (
                  <div className={"flex items-center gap-2"}>
                    <Label className={"text-lg"}>{name}</Label>
                    <EditIcon
                      className={"w-4 h-4 text-muted-foreground"}
                      onClick={() => {
                        setNameEditable(true)
                      }}
                    />
                  </div>
                ) : (
                  <UserInputName
                    onEnter={() => {
                      // setNameEditable(false)
                    }}
                  />
                )}
              </div>

              <CardDescription>id: {user?.id}</CardDescription>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            disabled={!imageChanged && !nameChanged}
            className={"w-full"}
            onClick={async () => {
              const res = await updateProfile()
              if (res?.ok) toast.success("更新成功")
              else toast.error("更新失败")
            }}
          >
            更新
          </Button>
        </CardFooter>
      </Card>

      <UserSignOutButton />
    </FlexContainer>
  )
}
