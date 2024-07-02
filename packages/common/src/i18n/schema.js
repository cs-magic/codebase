import { z } from "zod";
export const langTypeSchema = z.enum(["zh", "en"]);
export const inputLangTypeSchema = z.enum(["中文", "zh", "英文", "en"]);
export const langMap = {
    en: "en",
    英文: "en",
    zh: "zh",
    中文: "zh",
};
