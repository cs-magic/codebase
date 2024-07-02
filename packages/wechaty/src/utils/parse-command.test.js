import { z } from "zod";
import { parseLimitedCommand } from "./parse-command";
describe("parse command", () => {
    it("", () => {
        const result = parseLimitedCommand("set-backend", ["set-backend"]);
        expect(result?.command).toBe("set-backend");
        expect(result?.args).toBe("");
    });
    it("", () => {
        const result = parseLimitedCommand("set-backend  ", ["set-backend"]);
        expect(result?.command).toBe("set-backend");
        expect(result?.args).toBe("");
    });
    it("", () => {
        const result = parseLimitedCommand("set-backend  nodejs ss ", [
            "set-backend",
        ]);
        expect(result?.command).toBe("set-backend");
        expect(result?.args).toBe("nodejs ss");
    });
    it("parse multiple line", () => {
        const result = parseLimitedCommand("todo update 65\n" +
            'this.status="done"\n' +
            'this.notes.push("这个好像是张蔚加的，不知道为啥会在我这")', ["todo"]);
        expect(result?.command).toBe("todo");
        expect(result?.args).toBe("update 65\n" +
            'this.status="done"\n' +
            'this.notes.push("这个好像是张蔚加的，不知道为啥会在我这")');
    });
});
const backendSchema = z.union([z.literal("a"), z.literal("b")]);
