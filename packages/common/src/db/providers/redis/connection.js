import Redis from "ioredis";
import { getEnv } from "../../../env";
const env = getEnv();
const createRedisClient = () => new Redis().on("error", (err) => console.log("Redis Client Error", err));
export const globalForRedis = globalThis;
export const redis = globalForRedis.redis ?? createRedisClient();
if (env.NODE_ENV !== "production")
    globalForRedis.redis = redis;
