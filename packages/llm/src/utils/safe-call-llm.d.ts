import { ILlmQueryConfig, ILlmQueryConfigExtra, ILlmRes } from "../schema/llm.api";
/**
 * todo: 集中队列
 *
 * @param queryConfig
 * @param queryConfigExtra
 */
export declare const safeCallLLM: (queryConfig: ILlmQueryConfig, queryConfigExtra?: ILlmQueryConfigExtra) => Promise<ILlmRes>;
