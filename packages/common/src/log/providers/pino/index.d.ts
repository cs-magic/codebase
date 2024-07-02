/**
 * ref" Better Logging in Next.js Apps with Pino | by Tat Leung | Level Up Coding, https://levelup.gitconnected.com/better-logging-in-next-js-apps-with-pino-f973de4dd8dd
 */
import { Logger } from "pino";
export declare function getLogLevel(logger: string): string;
export declare function getLogger(name: string): Logger;
export declare const pinoLogger: Logger;
