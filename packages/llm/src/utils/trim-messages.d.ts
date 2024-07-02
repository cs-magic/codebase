import { ILlmMessage } from "@cs-magic/common/schema/message";
import { LlmModelType } from "../schema/llm.models";
/**
 * avoid context overflow
 *
 * @param messages
 * @param model
 */
export declare const trimMessages: (messages: ILlmMessage[], model: LlmModelType) => void;
