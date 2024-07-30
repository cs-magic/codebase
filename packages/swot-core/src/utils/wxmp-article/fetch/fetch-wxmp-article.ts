import { Card, LlmResponse } from "@prisma/client"

export type FetchWxmpArticleRes = { article: Card; llmResponse: LlmResponse }
