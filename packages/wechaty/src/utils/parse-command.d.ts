import { type ZodEnum } from "zod";
export type IParseCommandRes<T extends string> = null | {
    command: T;
    args: string;
};
export declare const parseLimitedCommand: <T extends string>(text: string, commands: T[] | ZodEnum<[T, ...T[]]>, prefix?: string) => IParseCommandRes<T>;
