import { redis } from "./connection"

export class RedisStore<T> {
  public async get(key: string) {
    const value = await redis.get(key)
    return value !== null ? (JSON.parse(value) as T) : value
  }

  public async set(key: string, value: T) {
    return redis.set(key, JSON.stringify(value))
  }

  public async del(key: string) {
    return redis.del(key)
  }
}
