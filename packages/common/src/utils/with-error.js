import { formatError } from "./format-error";
export const withError = (s) => async (func) => {
    try {
        return await func;
    }
    catch (e) {
        formatError(e);
        throw new Error(s);
    }
};
