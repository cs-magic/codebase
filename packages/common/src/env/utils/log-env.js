import { logger } from "@cs-magic/log/logger";
import pickBy from "lodash/pickBy";
export const logEnv = (filter) => {
    const data = pickBy(process.env, (v, k) => !filter || k.toLowerCase().includes(filter.toLowerCase()));
    logger.info(`-- environment variables (filter=${filter}): %o`, data);
};
