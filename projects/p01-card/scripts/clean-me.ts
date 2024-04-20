import { prisma } from "../../../packages/db/providers/prisma";

const cleanMe = async () => {
  const result = await prisma.user.deleteMany({
    where: { OR: [{ phone: "17766091857" }, { name: { contains: "南川" } }] },
  });
  console.log("result: ", result);
};

void cleanMe();
