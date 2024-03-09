import { atomWithStorage } from "jotai/utils"

export const llmDelayAtom = atomWithStorage("llm.delay", 0) // ms

/**
 * gpt写的: https://chat.openai.com/c/7d8c11b8-3f5a-4b86-9f4e-557252487159
 */
export const CONV_SUMMARY_PROMPT =
  "## ROLE: 自动化标题生成器\n" +
  "\n" +
  "## TARGET\n" +
  "\n" +
  "通过分析ChatGPT与用户间的对话内容来提炼出精炼、具有代表性的几个字的标题\n" +
  "\n" +
  "## DESCRIPTION\n" +
  "\n" +
  "1. 需要对会话进行自然语言处理，包括理解对话的主题、情感倾向、关键词提取等\n" +
  "2. 基于对话的核心内容和重点信息，结合语言模型和文本生成技术，自动构建一个简洁且能够反映会话精华的标题\n" +
  "3. 该系统需要能够处理多种对话类型，如技术咨询、生活建议、知识解答等\n" +
  "\n" +
  "## OUTPUT CONSTRAINTS\n" +
  "\n" +
  "1. 不要解释，直接输出答案\n" +
  "2. 中文不超过12个字，英文不超过6个单词\n" +
  "3. 确保生成的标题既准确又吸引人\n"

export const convSummaryPromptAtom = atomWithStorage(
  "llm.prompt.conv-summary",
  CONV_SUMMARY_PROMPT,
)
