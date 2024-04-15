import { logEnv } from "@cs-magic/common/log-env";
import { envPath } from "@cs-magic/common/path";
import dotenv from "dotenv";
import * as process from "process";

dotenv.config({ path: envPath, override: true });
logEnv("api_key");

export const env = {
  // env
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,

  // db
  DATABASE_URL: process.env.DATABASE_URL,

  // next-auth
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  // discord
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

  // ali
  ALI_AK: process.env.ALI_AK,
  ALI_SK: process.env.ALI_SK,

  // tencent
  TENCENT_AK: process.env.TENCENT_AK,
  TENCENT_SK: process.env.TENCENT_SK,

  // wechat
  WECHAT_APP_SECRET: process.env.WECHAT_APP_SECRET,
  NEXT_PUBLIC_WECHAT_APP_ID: process.env.NEXT_PUBLIC_WECHAT_APP_ID,

  // pusher
  PUSHER_APP_ID: process.env.PUSHER_APP_ID,
  PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
  NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,

  // llm
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  MOONSHOT_API_KEY: process.env.MOONSHOT_API_KEY,
  ZHIPU_API_KEY: process.env.ZHIPU_API_KEY,
  MINIMAX_API_KEY: process.env.MINIMAX_API_KEY,
  MINIMAX_GROUP_ID: process.env.MINIMAX_GROUP_ID,
  BAICHUAN_API_KEY: process.env.BAICHUAN_API_KEY,
  DASHSCOPE_API_KEY: process.env.DASHSCOPE_API_KEY,

  PROXY:
    process.env.proxy ??
    process.env.PROXY ??
    process.env.http_proxy ??
    process.env.HTTP_PROXY ??
    process.env.https_proxy ??
    process.env.HTTPS_PROXY,
};
