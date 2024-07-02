import { logger } from "@cs-magic/log/logger";
import { userDetailSchema } from "@cs-magic/prisma/schema/user.detail";
import Credentials from "next-auth/providers/credentials";
import { PROFILE_UPDATE_PROVIDER_ID } from "../auth-sms/const";
import { prisma } from "@cs-magic/common";
export const ProfileUpdateProvider = Credentials({
    id: PROFILE_UPDATE_PROVIDER_ID,
    credentials: {
        id: { type: "string" },
        name: { type: "string" },
        image: { type: "string" },
    },
    authorize: async (credentials, req) => {
        logger.info("updating profile with credentials: %o", credentials);
        if (!credentials)
            throw new Error("no credentials");
        const { image, name, id } = credentials;
        if (!image || !name)
            throw new Error("no name or image");
        await prisma.user.findUniqueOrThrow({ where: { id } });
        return prisma.user.update({
            where: { id },
            data: { name, image },
            ...userDetailSchema,
        });
    },
});
