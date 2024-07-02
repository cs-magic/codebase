import { logger } from "@cs-magic/log/logger";
import { AxiosError } from "axios";
export const formatError = (e) => {
    const s = e instanceof AxiosError
        ? JSON.stringify(e.response?.data)
        : e instanceof Error
            ? e.message
            : e;
    logger.error(`❌ ${s}`);
    return s;
};
