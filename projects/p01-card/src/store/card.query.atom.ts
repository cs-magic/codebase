import { atomWithStorage } from "jotai/utils"
import { BackendType } from "../../../../packages/llm/schema/llm.base"

export const cardFetchWithCacheAtom = atomWithStorage<boolean>(
  "card.fetch.with-cache",
  true,
)
export const cardFetchEngineAtom = atomWithStorage<BackendType>(
  "card.fetch-engine",
  "nodejs",
)

export const cardFetchStatEnabledAtom = atomWithStorage(
  "card.stat.refetch",
  false,
)
export const cardFetchCommentsEnabledAtom = atomWithStorage(
  "card.comments.refetch",
  false,
)
