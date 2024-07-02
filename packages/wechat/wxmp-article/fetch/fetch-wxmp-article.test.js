import { runFetchWxmpArticle } from "./fetch-wxmp-article.script";
it("should fetched wxmp-article via simulator regardless of blocking", async () => {
    await runFetchWxmpArticle();
}, 30e3);
