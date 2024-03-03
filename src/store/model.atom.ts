import { atom } from "jotai/index"

import { IModelView } from "@/schema/query-model"

export const modelsAtom = atom<IModelView[]>([])
