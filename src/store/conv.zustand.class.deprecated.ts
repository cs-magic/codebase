import { IContext } from "@/schema/message"
import { produce } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { getNewId } from "../../packages/common-algo/id"
import { createSelectors } from "../../packages/common-state-management/zustand/utils"
import { IAppClient } from "../schema/app.detail"
import { IConvBase, IConvDetail } from "../schema/conv"
import { forkApp } from "./app.utils"
import { ConvSchema } from "./conv.schema"

const useConvStoreBase = create<ConvSchema>()(
  immer((set, get, store) => ({
    // todo: why explicitly type
    convs: [] as IConvBase[],
    conv: null as IConvDetail | null,
    apps: [] as IAppClient[],
    appIndex: 0,

    get appId() {
      const { apps, appIndex } = get()
      return apps[appIndex]?.clientId ?? null
    },

    get requests() {
      return get().conv?.requests ?? []
    },

    get requestId(): string | null {
      return get().conv?.id ?? null
    },

    get responses() {
      return get().request?.responses ?? []
    },

    get commonContext() {
      return get().request?.context ?? []
    },

    get request() {
      return get().requests.find((r) => r.id === get().requestId) ?? null
    },

    get responding() {
      return get().responses.some((r) => !!r.tStart && !r.tEnd)
    },

    get bestResponse() {
      return get().responses[get().appIndex] ?? null
    },

    get bestContext(): IContext {
      return get().bestResponse
        ? [
            ...get().commonContext,
            {
              content:
                get().bestResponse?.error ??
                get().bestResponse?.content ??
                // todo: null?
                "",
              role: "assistant",
              isError: !!get().bestResponse?.error,
              updatedAt: get().bestResponse?.updatedAt,
            },
          ]
        : get().commonContext
    },

    initAppsFromServer: (apps) => {
      set((state) => {
        state.apps = apps.filter((a) => a.id === "gpt-3.5-turbo").map(forkApp)
        state.appIndex = 0
      })
    },

    initConvFromServer: (conv) => {
      set((state) => {
        state.conv = conv
      })
    },

    updateRequestId: (requestId) => {
      set((state) => {
        const responses =
          state.conv?.requests.find((r) => r.id === requestId)?.responses ?? []
        state.apps = responses.map((r) => ({
          ...r.app,
          response: r,
          isDraft: false,
          clientId: getNewId(),
        }))
      })
    },

    selectApp: (appClientId) => {
      set((state) => {
        state.appIndex = state.apps.findIndex((a) => a.clientId === appClientId)
      })
    },

    pushApp: (app) => {
      set((state) => {
        state.apps.push(forkApp(app))
      })
    },

    replaceApp: (appClientId, app) => {
      set((state) => {
        const index = state.apps.findIndex((a) => a.clientId === appClientId)
        if (index < 0) return
        state.apps[index] = forkApp(app)
      })
    },

    forkApp: (app) => {
      set((state) => {
        const index = state.apps.findIndex((a) => a.clientId === app.clientId)
        if (index < 0) return
        state.apps.splice(index + 1, 0, forkApp(app))
      })
    },

    delApp: (appClientId) => {
      set((state) => {
        const index = state.apps.findIndex((a) => a.clientId === appClientId)
        if (index < 0) return
        state.apps.splice(index, 1)
        state.appIndex = 0
      })
    },

    updateAppResponse: (requestId, appClientId, func) =>
      set((state) =>
        produce(state, (state) => {
          console.log({ requestId, appClientId })
          const conv = get().conv
          if (requestId !== conv?.currentRequestId) return
          const req = conv.requests.find((r) => r.id === requestId)
          // todo: appClientId ?
          const res = req?.responses.find((r) => r.appId === appClientId)
          if (!res) return
          func(res)
        }),
      ),

    updateConvTitle: (convId, func) =>
      set((state) =>
        produce(state, (state) => {
          console.log({ convId })
          const res = get().convs.find((c) => c.id === convId)?.titleResponse
          if (!res) return
          func(res)
        }),
      ),
  })),
)
export const useConvStore = createSelectors(useConvStoreBase)
