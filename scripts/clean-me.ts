import { prisma } from "@cs-magic/common/db/providers/prisma/connection"

const cleanMe = async () => {
  const result = await prisma.user.deleteMany({
    where: { OR: [{ phone: "17766091857" }, { name: { contains: "南川" } }] },
  })
  console.log("result: ", result)
}

void cleanMe()
