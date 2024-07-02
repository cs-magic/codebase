import { z } from "zod";
export const pusherServerIdSchema = z
    .union([z.literal("aws"), z.literal("tencent_ws"), z.literal("tencent_wss")])
    .default("tencent_wss");
