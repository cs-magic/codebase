import { generatedDir } from "packages/common/src/index.js";
import fs, { promises } from "fs";
import * as process from "node:process";
import path from "path";
import { formatAction } from "./format-action";
export const dumpFile = async (content, 
// type: "json" | "text" = "json",
options) => {
    const fd = path.join(process.cwd(), `__generated`);
    if (!fs.existsSync(fd))
        fs.mkdirSync(fd);
    let fp = path.join(fd, `${Date.now()}.json`);
    if (options) {
        if ("fn" in options) {
            const fn = options.fn;
            const dir = options.dir ?? generatedDir;
            if (!fs.existsSync(dir))
                fs.mkdir(dir, () => null);
            fp = path.join(dir, fn);
        }
        else if ("fp" in options) {
            fp = options.fp;
        }
    }
    await formatAction(async () => {
        await promises.writeFile(fp, typeof content === "string" ? content : JSON.stringify(content, null, 2));
    }, `dumping JSON file into file://${fp}`);
};
