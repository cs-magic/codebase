import * as fs from "fs";
export const ensureDirSync = (s) => {
    if (!fs.existsSync(s))
        fs.mkdirSync(s);
    return s;
};
