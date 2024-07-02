import assign from "lodash/assign";
import merge from "lodash/merge";
describe("", () => {
    it("should ", () => {
        const a = { a: { b: { c: 1 } } };
        const b = { a: { c: { d: 2 } } };
        console.log({ ...a, ...b });
        console.log(assign({ ...a }, b));
        console.log(merge({ ...a }, b));
        console.log(merge({
            a: [{ b: 2 }, { d: 4 }],
        }, {
            a: [{ b: 3 }, { e: 5 }],
        }));
    });
});
