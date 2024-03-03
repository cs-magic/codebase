import { atom } from "jotai"

import { IQueryConvListView } from "@/schema/query-conv"

export const queryConvsAtom = atom<IQueryConvListView[]>([])
export const queryConvIdAtom = atom<string | null>(null)
export const queryConvAtom = atom((get) =>
  get(queryConvsAtom).find((c) => c.id === get(queryConvIdAtom)),
)
