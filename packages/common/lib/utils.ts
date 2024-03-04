import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from "nanoid"

import { NANOID_LEN } from "../config/system"
import { env } from "@/env"
import { getNodeEnv } from "../actions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ref: https://stackoverflow.com/a/16702965/9422455
export const PHONE_REGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

export const validatePhone = (s: string) => PHONE_REGEX.test(s)

export const staticCreate = <T = any>(f: () => Promise<T>, initial?: T) => {
  const g = {
    data: initial,
  } as unknown as {
    data: T | undefined
  }
  if (!g.data) {
    void f().then((data) => {
      g.data = data
    })
  }
  return g.data
}

export function getRecordKeys<K extends string, T extends Record<K, any> = any>(
  record: T,
): K[] {
  return Object.keys(record) as K[]
}

export const getNewId = (n = NANOID_LEN) =>
  customAlphabet(
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
    NANOID_LEN,
  )(n)

export const isServer = typeof localStorage === "undefined"
export const isClient = !isServer

const nodeEnv = staticCreate(getNodeEnv)
export const isProd = nodeEnv === "production"
export const isDev = nodeEnv === "development"
export const isTest = nodeEnv === "test"
