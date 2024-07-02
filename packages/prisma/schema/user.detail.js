import { Prisma } from "@prisma/client";
export const userDetailSchema = Prisma.validator()({
    include: {},
});
