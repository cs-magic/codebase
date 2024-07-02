import { z } from "zod";
export const backendTypeSchema = z.enum(["fastapi", "nodejs"]);
