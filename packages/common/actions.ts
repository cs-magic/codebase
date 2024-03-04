"use server"

import { env } from "@/env"

export const getNodeEnv = async (): Promise<string> => env.NODE_ENV
