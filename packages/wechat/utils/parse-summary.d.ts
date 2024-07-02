import { ISummaryParsed } from "../schema/card";
/**
 *  regex of `/ms`: ref:  https://stackoverflow.com/a/66001191/9422455
 * @param input
 */
export declare const parseSummary: (input?: string | null) => ISummaryParsed;
