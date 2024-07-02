/**
 * error handler: Axios & Error handling like a boss 😎 - DEV Community, https://dev.to/mperon/axios-error-handling-like-a-boss-333d
 */
import { logger } from "@cs-magic/log/logger";
import axios from "axios";
import { toast } from "sonner";
export class HttpError extends Error {
    constructor(message) {
        super(message); // 'Error' breaks prototype chain here
        this.name = "HttpError";
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}
// type guard to identify that is an ErrorHandlerObject
function isErrorHandlerObject(value) {
    if (typeof value === "object") {
        return ["message", "after", "before", "notify"].some((k) => k in value);
    }
    return false;
}
class ErrorHandlerRegistry {
    handlers = new Map();
    parent = null;
    constructor(parent = undefined, input) {
        if (typeof parent !== "undefined")
            this.parent = parent;
        if (typeof input !== "undefined")
            this.registerMany(input);
    }
    // allow to register an handler
    register(key, handler) {
        this.handlers.set(key, handler);
        return this;
    }
    // unregister a handler
    unregister(key) {
        this.handlers.delete(key);
        return this;
    }
    // search a valid handler by key
    find(seek) {
        const handler = this.handlers.get(seek);
        if (handler)
            return handler;
        return this.parent?.find(seek);
    }
    // pass an object and register all keys/value pairs as handler.
    registerMany(input) {
        for (const [key, value] of Object.entries(input)) {
            this.register(key, value);
        }
        return this;
    }
    // handle error seeking for key
    handleError(seek, error) {
        if (Array.isArray(seek)) {
            return seek.some((key) => {
                if (key !== undefined)
                    return this.handleError(String(key), error);
            });
        }
        const handler = this.find(String(seek));
        if (!handler) {
            return false;
        }
        else if (typeof handler === "string") {
            return this.handleErrorObject(error, { message: handler });
        }
        else if (typeof handler === "function") {
            const result = handler(error);
            if (isErrorHandlerObject(result))
                return this.handleErrorObject(error, result);
            return !!result;
        }
        else if (isErrorHandlerObject(handler)) {
            return this.handleErrorObject(error, handler);
        }
        return false;
    }
    // if the error is an ErrorHandlerObject, handle here
    handleErrorObject(error, options = {}) {
        options?.before?.(error, options);
        toast.error(options.message ?? "Unknown Error!!");
        return true;
    }
    // this is the function that will be registered in interceptor.
    responseErrorHandler(error, direct) {
        if (error === null)
            throw new Error("Unrecoverrable error!! Error is null!");
        if (axios.isAxiosError(error)) {
            const response = error?.response;
            const config = error?.config;
            const data = response?.data;
            if (!direct && config?.raw)
                throw error;
            const seekers = [
                data?.code,
                error.code,
                error?.name,
                String(data?.status),
                String(response?.status),
            ];
            const result = this.handleError(seekers, error);
            if (!result) {
                if (data?.code && data?.description) {
                    return this.handleErrorObject(error, {
                        message: data?.description,
                    });
                }
            }
        }
        else if (error instanceof Error) {
            return this.handleError(error.name, error);
        }
        //if nothings works, throw away
        throw error;
    }
}
// create ours globalHandlers object
const globalHandlers = new ErrorHandlerRegistry();
globalHandlers.registerMany({
    //this key is sent by api when login is required
    login_required: {
        message: "Login required!",
        //the after function will be called when the message hides.
        after: () => logger.info("redirect user to /login"),
    },
    no_input_data: "You must fill form values here!",
    //this key is sent by api on login error.
    invalid_login: {
        message: "Invalid credentials!",
    },
    "404": { message: "API Page Not Found!" },
    ERR_FR_TOO_MANY_REDIRECTS: "Too many redirects.",
});
// you can registre only one:
globalHandlers.register("HttpError", (error) => {
    //send email to developer that api return an 500 server internal console.error
    return { message: "Internal server errror! We already notify developers!" };
    //when we return an valid ErrorHandlerObject, will be processed as whell.
    //this allow we to perform custom behavior like sending email and default one,
    //like showing an message to user.
});
export function dealWith(solutions, ignoreGlobal) {
    let global;
    if (ignoreGlobal === false)
        global = globalHandlers;
    const localHandlers = new ErrorHandlerRegistry(global, solutions);
    return (error) => localHandlers.responseErrorHandler(error, true);
}
function responseHandler(response) {
    const config = response?.config;
    if (config.raw) {
        return response;
    }
    if (response.status == 200) {
        const data = response?.data;
        if (!data) {
            throw new HttpError("API Error. No data!");
        }
        return data;
    }
    throw new HttpError("API Error! Invalid status code!");
}
export function createHttpInstance(config) {
    const instance = axios.create({
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
        ...config,
    });
    const responseError = (error) => globalHandlers.responseErrorHandler(error);
    // todo
    // @ts-ignore
    // instance.interceptors.response.use(responseHandler, responseError)
    return instance;
}
