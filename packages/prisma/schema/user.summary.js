import { Prisma } from "@prisma/client";
export const userSummarySchema = Prisma.validator()({
    select: {
        id: true,
        image: true,
        name: true,
    },
});
export const convertUserSummary = (user) => {
    const avatar = user.avatar ?? user.image;
    if (user.name && avatar)
        return {
            name: user.name,
            image: avatar,
        };
    return null;
};
export const wechatMessageDetailSchema = Prisma.validator()({
    include: {
        talker: true,
        listener: true,
        room: true,
    },
});
