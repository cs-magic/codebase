import { prisma } from "../packages/common-db"

const initLLM = async () => {
  const deletedCompanies = await prisma.company.deleteMany()

  const createdCompanies = await prisma.company.createMany({
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

  const createdModels = await prisma.model.createMany({
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

  const models = await prisma.model.findMany()
  const createdApps = await prisma.app.createMany({
    data: models.map((m) => ({
      id: m.id,
      modelName: m.id,
      title: m.title,
      // 商店上架
      granted: true,
    })),
  })

  console.log({
    deletedCompanies,
    createdCompanies,
    createdModels,
    createdApps,
  })
}

void initLLM()
