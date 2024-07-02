import { ZodError } from "zod";
export const parseAsyncWithFriendlyErrorMessage = async (schema, input) => {
    try {
        const result = await schema.parseAsync(input ?? "");
        return result;
    }
    catch (e) {
        if (e instanceof ZodError) {
            const message = JSON.parse(e.message);
            // console.error(message[0]?.message)
            // return
            throw new Error(message[0]?.message);
        }
        console.error(e);
        throw e;
    }
};
