import Redis from "ioredis";
declare const createRedisClient: () => Redis;
export declare const globalForRedis: {
    redis: ReturnType<typeof createRedisClient> | undefined;
};
export declare const redis: Redis;
export {};
