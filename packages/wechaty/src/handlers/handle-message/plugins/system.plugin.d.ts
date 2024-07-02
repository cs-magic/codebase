import { FeatureMap } from "../../../schema/commands";
import { BasePlugin } from "./base.plugin";
export declare class SystemPlugin extends BasePlugin {
    i18n: FeatureMap<"list-models" | "set-avatar" | "set-preference" | "sync-rooms" | "sync-contacts">;
    parse(input?: string): Promise<void>;
    listModels(): Promise<void>;
}
