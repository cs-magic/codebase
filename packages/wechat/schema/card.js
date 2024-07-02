import { z } from "zod";
export const cardPreviewEngineTypeSchema = z.enum([
    "html2image",
    "html2canvas",
    "modern-screenshot",
]);
