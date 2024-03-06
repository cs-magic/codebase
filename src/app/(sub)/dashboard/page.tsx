"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { FlexContainer } from "../../../../packages/common/components/flex-container"
import { Button } from "../../../../packages/common/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../../../packages/common/components/ui/card"
import {
  useUserDraftImage,
  useUserDraftName,
} from "../../../../packages/common/hooks/use-user"
import { useUserUpdateProfile } from "../../../../packages/common/hooks/use-user-update-profile"
import { AuthContainer } from "../../../components/auth-container"
import { UserInputAvatar } from "../../../components/user-input-avatar"
import { UserInputName } from "../../../components/user-input-name"
import { UserSignOutButton } from "../../../components/user-sign-out-button"

export default function DashboardPage() {
  const session = useSession()
  const user = session.data?.user
  const name = useUserDraftName()
  const image = useUserDraftImage()

  const router = useRouter()
  useEffect(() => {
    if (session.status === "unauthenticated") return router.push("/")
  }, [session.status])

  const updateProfile = useUserUpdateProfile()

  return (
    <AuthContainer>
      <FlexContainer orientation={"vertical"} className={"!gap-8"}>
        <Card className={"text-foreground w-full"}>
          <CardHeader>基本信息</CardHeader>

          <CardContent>
            <div className={"w-full flex gap-4"}>
              <UserInputAvatar />

              <div className={"grow flex flex-col gap-2 justify-center"}>
                <UserInputName />

                <CardDescription>id: {user?.id}</CardDescription>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              disabled={user?.name === name && user?.image === image}
              className={"w-full"}
              onClick={updateProfile}
            >
              更新
            </Button>
          </CardFooter>
        </Card>

        <UserSignOutButton />
      </FlexContainer>
    </AuthContainer>
  )
}
