import { sampleWxmpArticleUrl } from "@cs-magic/common/sample";
import { fetchWechatArticleComments, fetchWechatArticleStat } from "./wxapi";
describe("wxapi without token", () => {
    test("no token", async () => {
        const stat = await fetchWechatArticleStat(sampleWxmpArticleUrl);
        expect(stat.code).toBe(-1002);
        expect(stat.msg).toBe("无此用户");
    });
});
describe("wxapi with token", () => {
    test("stat ok", async () => {
        const resStat = await fetchWechatArticleStat(sampleWxmpArticleUrl);
        expect(resStat.code).toBe(0);
        expect(resStat.data.readnum).toBeGreaterThan(0);
    });
    test("comments ok", async () => {
        const resComments = await fetchWechatArticleComments(sampleWxmpArticleUrl);
        expect(resComments.code).toBe(0);
        expect(resComments.data.length).toBeGreaterThan(0);
    });
});
