import { AxiosError, CreateAxiosDefaults } from "axios";
declare module "axios" {
    interface AxiosRequestConfig {
        raw?: boolean;
        silent?: boolean;
    }
}
export declare class HttpError extends Error {
    constructor(message?: string);
}
type THttpError = Error | AxiosError | null;
interface ErrorHandlerObject {
    message?: string;
    notify?: object;
    after?(error?: THttpError, options?: ErrorHandlerObject): void;
    before?(error?: THttpError, options?: ErrorHandlerObject): void;
}
type ErrorHandlerFunction = (error?: THttpError) => ErrorHandlerObject | boolean | undefined;
type ErrorHandler = ErrorHandlerFunction | ErrorHandlerObject | string;
type ErrorHandlerMany = Record<string, ErrorHandler>;
export declare function dealWith(solutions: ErrorHandlerMany, ignoreGlobal?: boolean): (error: THttpError) => boolean;
export declare function createHttpInstance(config?: CreateAxiosDefaults): import("axios").AxiosInstance;
export {};
