import { ZodBoolean, ZodString } from "zod";
export const dumpInputValidator = (v) => {
    if ("options" in v)
        return dumpInputValidator(v.options.map((o) => 
        // o instanceof ZodLiteral ? o.value :
        o));
    if (v instanceof Array)
        return v.join(",");
    if (v instanceof ZodString)
        return "有效字符串"; // todo: more-friendly ?
    if (v instanceof ZodBoolean)
        return "true/false";
    return v;
};
