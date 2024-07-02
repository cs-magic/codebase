import { BaseSimulator } from "./base-simulator";
/**
 * !IMPORTANT: 需要 swot 项目启动
 */
export class WxmpArticleSimulator extends BaseSimulator {
    async crawl(url) {
        const page = await this.initPage();
        console.log(`-- visiting: ${url}`);
        //  等待加载（包括跳转）完毕
        await page.goto(url, { waitUntil: "networkidle" });
        //  可能会触发微信的风控
        if (page.url().includes("wappoc_appmsgcaptcha")) {
            await page.locator("#js_verify").click();
            await page.waitForNavigation({ waitUntil: "networkidle" });
        }
        // Extract content or perform other actions on the page
        const content = await page.content();
        // 仅供测试环境
        // await dumpFile(content, `${Date.now()}.html`)
        return content;
    }
}
