import { ILlmMessage } from "@cs-magic/common/schema/message";
import { LlmModelType } from "../schema/llm.models";
/**
 * @see:
 *  - https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
 *  - https://www.npmjs.com/package/tiktoken
 *
 *  todo: why the expected is 129, but we got 126 ?
 *
 * @param messages
 * @param model
 */
export declare const calculateToken: (messages: ILlmMessage[], model: LlmModelType) => number;
