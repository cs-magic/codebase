import { FeatureMap, FeatureType } from "../../../schema/commands";
import { BasePlugin } from "./base.plugin";
export declare class ChatterPlugin extends BasePlugin {
    static name: FeatureType;
    i18n: FeatureMap<"enable" | "disable">;
    help(): Promise<void>;
    safeReplyWithAI(): Promise<void>;
}
