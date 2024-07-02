import { Prisma } from "@prisma/client";
export declare const userSummarySchema: {
    select: {
        id: true;
        image: true;
        name: true;
    };
};
export type IUserSummary = Prisma.UserGetPayload<typeof userSummarySchema> & {
    avatar?: string;
};
export type IUserSummaryFilled = {
    name: string;
    image: string;
};
export declare const convertUserSummary: (user: IUserSummary) => IUserSummaryFilled | null;
export declare const wechatMessageDetailSchema: {
    include: {
        talker: true;
        listener: true;
        room: true;
    };
};
export type IWechatMessageDetail = Prisma.WechatMessageGetPayload<typeof wechatMessageDetailSchema>;
