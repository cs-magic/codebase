import { atom } from "jotai"

import { IModelView } from "@/schema/query-model"

export const modelsAtom = atom<IModelView[]>([])
