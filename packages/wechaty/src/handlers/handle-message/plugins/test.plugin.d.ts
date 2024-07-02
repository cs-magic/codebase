import { BasePlugin } from "./base.plugin";
export declare class TestPlugin extends BasePlugin {
    run(args: string): Promise<void>;
    testDescribeLastImage(): Promise<void>;
    testReplyLink(): Promise<void>;
    testRecallLastOne(): Promise<void>;
}
