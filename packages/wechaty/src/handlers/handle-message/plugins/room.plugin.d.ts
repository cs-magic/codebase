import { FeatureMap } from "../../../schema/commands";
import { BasePlugin } from "./base.plugin";
export declare class RoomPlugin extends BasePlugin {
    i18n: FeatureMap<"enable-announce" | "disable-announce" | "set-announce-n">;
}
