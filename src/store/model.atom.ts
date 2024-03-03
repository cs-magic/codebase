import { atom } from "jotai"

import { IModelView } from "@/schema/model"

export const modelsAtom = atom<IModelView[]>([])
