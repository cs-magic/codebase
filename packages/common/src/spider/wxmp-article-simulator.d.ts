import { BaseSimulator } from "./base-simulator";
/**
 * !IMPORTANT: 需要 swot 项目启动
 */
export declare class WxmpArticleSimulator extends BaseSimulator {
    crawl(url: string): Promise<string>;
}
