import { atomWithStorage } from "jotai/utils"

export const llmDelayAtom = atomWithStorage("llm.delay", 0) // ms

/**
 * gpt写的: https://chat.openai.com/c/7d8c11b8-3f5a-4b86-9f4e-557252487159
 */
export const CONV_SUMMARY_PROMPT =
  "# ROLE: 标题总结\n" +
  "## TARGET\n" +
  "你是一位编辑。任务是总结用户与AI的对话，提炼出几个字的标题\n" +
  "## CONSTRAINTS\n" +
  "1. 不要解释，直接输出答案\n" +
  "2. 要求中文，不超过12个字\n" +
  "3. 确保准确\n"

export const convSummaryPromptAtom = atomWithStorage(
  "llm.prompt.conv-summary",
  CONV_SUMMARY_PROMPT,
)
