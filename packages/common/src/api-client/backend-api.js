import { logger } from "@cs-magic/log/logger";
import { env } from "../env";
import { createHttpInstance } from "./core";
const baseURL = env.NEXT_PUBLIC_BACKEND_URL;
logger.info(`backend api baseURL: ${baseURL}`);
export const backendApi = createHttpInstance({
    baseURL,
});
