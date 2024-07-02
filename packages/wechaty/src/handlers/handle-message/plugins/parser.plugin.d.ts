import { CardSimulator } from "@cs-magic/common/spider/card-simulator";
import { FeatureMap, FeatureType } from "../../../schema/commands";
import { BasePlugin } from "./base.plugin";
export declare class ParserPlugin extends BasePlugin {
    static name: FeatureType;
    static uniParser: CardSimulator | null;
    static toParse: number;
    i18n: FeatureMap<"">;
    help(): Promise<void>;
    parseSelf(): Promise<void>;
    parseQuote(): Promise<void>;
    safeParseCard({ message, }: {
        message: {
            convId: string;
            text: string;
            id: string;
            roomTopic?: string;
        };
    }): Promise<void>;
}
