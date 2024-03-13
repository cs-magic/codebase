import { userDetailSchema } from "@/schema/user.detail"
import { PROFILE_UPDATE_PROVIDER_ID } from "../common-auth-sms/const"
import { prisma } from "../common-db"
import Credentials from "next-auth/providers/credentials"

export const ProfileUpdateProvider = Credentials({
  id: PROFILE_UPDATE_PROVIDER_ID,
  credentials: {
    id: { type: "string" },
    name: { type: "string" },
    image: { type: "string" },
  },
  authorize: async (credentials, req) => {
    console.log("updating profile with credentials: ", credentials)
    if (!credentials) throw new Error("no credentials")
    const { image, name, id } = credentials
    if (!image || !name) throw new Error("no name or image")

    await prisma.user.findUniqueOrThrow({ where: { id } })

    return await prisma.user.update({
      where: { id },
      data: { name, image },
      ...userDetailSchema,
    })
  },
})
