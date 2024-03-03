import { atom } from "jotai/index"
import { IModelView } from "@/core/query-llm/server/route"

export const modelsAtom = atom<IModelView[]>([])
