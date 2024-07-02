import { IUserSummaryFilled } from "@cs-magic/prisma/schema/user.summary";
import { BaseSimulator } from "./base-simulator";
/**
 * !IMPORTANT: 需要 swot 项目启动
 */
export declare class CardSimulator extends BaseSimulator {
    static runningTasksCount: number;
    genCard(content: string, user: IUserSummaryFilled): Promise<{
        cardUrl: string;
    }>;
    /**
     *
     * @param content LLM 解析的结果
     * @param user 微信的用户的昵称/头像
     */
    genCardInner(content: string, user: IUserSummaryFilled): Promise<{
        cardUrl: string;
    }>;
    initPage(): Promise<import("./base-simulator").Page>;
}
