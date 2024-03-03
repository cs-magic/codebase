import { Company } from "@prisma/client"
import { db } from "@/common/lib/db"

export type CompanyId = "openai" | "moonshot"
export const supportedCompanies: Record<CompanyId, Company> = {
  openai: {
    id: "openai",
    title: "Open AI",
    url: null,
    logo: null,
  },
  moonshot: {
    id: "moonshot",
    title: "月之暗面",
    url: null,
    logo: null,
  },
}

const initLLM = async () => {
  const deletedCompanies = await db.company.deleteMany()

  const createdCompanies = await db.company.createMany({
    data: [
      {
        id: "openai",
        title: "Open AI",
        url: "https://chat.openai.com/",
        logo: null,
      },
      {
        id: "moonshot",
        title: "月之暗面",
        url: "https://kimi.moonshot.cn/",
        logo: null,
      },
    ],
  })

  const createdModels = await db.model.createMany({
    data: [
      {
        id: "gpt-3.5-turbo",
        title: "ChatGPT 3.5",
        companyId: "openai",
      },

      {
        id: "gpt-4",
        title: "ChatGPT 4",
        companyId: "openai",
      },

      {
        id: "gpt-4-32k",
        title: "ChatGPT 4 (32k)",
        companyId: "openai",
      },
      { id: "kimi", title: "Kimi Chat", companyId: "moonshot" },
    ],
  })

  console.log({
    deletedCompanies,
    createdCompanies,
    createdModels,
  })

  const user = await db.user.findFirst()
  if (user) {
    const models = await db.model.findMany()
    const createdQueryConfigs = await db.queryConfig.createMany({
      data: models.map((m) => ({
        id: m.id,
        modelId: m.id,
        title: m.title,
        fromUserId: user.id,
      })),
    })

    console.log({ createdQueryConfigs })
  }
}

void initLLM()
