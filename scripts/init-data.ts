import { Company, Prisma } from "@prisma/client"
import { CompanyId } from "@/schema/llm"
import { db } from "@/server/db"

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

  const createdOpenAIModels = await db.model.createMany({
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
    ],
  })

  const createdKimiModels = await db.model.createMany({
    data: [{ id: "kimi", title: "Kimi Chat", companyId: "moonshot" }],
  })

  const models = await db.model.findMany()
  const createdPApps = await Promise.all(
    models.map(
      async (model) =>
        await db.app.create({
          data: { id: model.id, modelId: model.id, title: model.title },
        }),
    ),
  )

  console.log({
    deletedCompanies,
    createdCompanies,
    createdOpenAIModels,
    createdKimiModels,
    createdPApps,
  })
}

void initLLM()
