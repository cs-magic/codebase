import { Prisma } from "@prisma/client";
export declare const userDetailSchema: {
    include: {};
};
export type IUserDetail = Prisma.UserGetPayload<typeof userDetailSchema>;
