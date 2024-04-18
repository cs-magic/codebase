import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { Task } from "@cs-magic/prisma/prisma/generated/zod"
import taskStatusSchema from "@cs-magic/prisma/prisma/generated/zod/inputTypeSchemas/TaskStatusSchema"
import omit from "lodash/omit"
import { z } from "zod"
import { prisma } from "../../../../packages/common-db/providers/prisma"
import { FeatureMap, FeatureType } from "../../schema/commands"
import { listTodo } from "../../utils/list-todo"
import { parseLimitedCommand } from "../../utils/parse-command"
import { BaseManager } from "./base.manager"
import { type TaskStatus } from ".prisma/client"

export enum Priority {
  highest = 1,
  high = 3,
  normal = 5,
  low = 7,
  lowest = 9,
}

const commandTypeSchema = z.enum([
  "list",
  "add",
  "filter",
  "set-priority",
  "set-status",
  "set-title",
  "add-note",
])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  zh: {
    title: "任务管理",
    description: "",
    commands: {
      历史: {
        type: "list",
        description: "查询任务历史",
      },
      新增: {
        type: "add",
        description: "添加一个新任务",
      },
      重命名: {
        type: "set-title",
        description: "修改一个任务的标题",
      },
      更新: {
        type: "set-status",
        description: "更新一个任务的状态（待开始，进行中，已完成，已取消）",
      },
      筛选: {
        type: "filter",
        description: "筛选任务（否则结果可能太长啦）",
      },
    },
  },
  en: {
    title: "Todo Manager",
    description:
      "Hello, I am your PERSONAL Todo Manager!" +
      "\nYou can record and manage any todo here." +
      "\nHope I can help you~  😊",
    commands: {
      list: {
        type: "list",
        description: "list todo",
      },
      add: {
        type: "add",
        description: "add a todo with title",
      },
      "set-title": {
        type: "set-title",
        description: "rename the title a todo",
      },
      "set-status": {
        type: "set-status",
        description:
          "update the status of a todo (pending,running,done,discarded)",
      },
      "add-note": {
        type: "add-note",
      },
      "set-priority": {
        type: "set-priority",
      },
      filter: {
        type: "filter",
        description: "filter todo in case of it's too long",
      },
    },
  },
}

export class TodoManager extends BaseManager {
  public i18n = i18n
  public name: FeatureType = "todo"

  async help() {
    const commands = await this.getCommands()
    const desc = await this.getDescription()
    await this.standardReply(
      [desc, SEPARATOR_LINE].join("\n"),
      Object.keys(commands).map((command) => `  ${this.name} ${command}`),
    )
  }

  /**
   * 1. input prefix ==> command type (zh/en --> enum)
   * 2. operate command
   *
   * @param input
   */
  async parse(input?: string) {
    if (!input) return this.help()

    const commands = this.i18n[await this.getLang()].commands
    const parsed = parseLimitedCommand(
      input ?? "",
      z.enum(Object.keys(commands) as [string, ...string[]]),
    )
    if (parsed) {
      const commandKeyInInput = parsed.command
      const commandKeyInEnum = commands[commandKeyInInput]?.type
      const commandType = await commandTypeSchema.parseAsync(commandKeyInEnum)
      switch (commandType) {
        case "list":
          await this.listTodo()
          break

        case "filter":
          await this.listTodo({
            filter: await z.string().min(1).parseAsync(parsed.args),
          })
          break

        case "add":
          await this.addTodo(await z.string().min(1).parseAsync(parsed.args))
          break

        case "set-title": {
          const m = /^\s*(\d+)\s*(.*?)\s*$/.exec(parsed.args)
          if (!m) throw new Error("输入不合法")
          const newTitle = await z.string().min(1).parseAsync(m?.[2])
          await this.renameTodo(Number(m[1]), newTitle)
          break
        }

        case "set-status": {
          const m = /^\s*(\d+)\s*(\S+)\s*(.*)?$/.exec(parsed.args)
          // console.log({ m })
          if (!m) throw new Error("输入不合法")
          const index = Number(m[1])
          const newStatus = await taskStatusSchema.parseAsync(m?.[2])
          const note = m?.[3]
          await this.updateTodo(index, newStatus, note)
          break
        }

        case "set-priority": {
          const m = /^\s*(\d+)\s*(\d+)\s*$/.exec(parsed.args)
          // console.log({ m })
          if (!m) throw new Error("输入不合法")
          const index = Number(m[1])
          const priority = await z
            .number()
            .int()
            .min(1)
            .max(9)
            .parseAsync(Number(m?.[2]))
          await this.setPriority(index, priority)
          break
        }
      }
    }
  }

  /**
   * 在用户 list 或者 filter 之后会改变用户的查询偏好
   * 基于这个偏好，我们确定输出的形式
   */
  async listOrFilterTodo() {
    const preference = await this.getUserPreference()
    return this.listTodo({ filter: preference.todoFilter })
  }

  async listTodo(options?: { filter?: string }) {
    const tasks = (await listTodo(this.message.talker().id))
      .map((k, i) => ({
        ...k,
        i: i + 1,
      }))
      .filter(
        (item) =>
          !options?.filter || item.title.toLowerCase().includes(options.filter),
      )

    const serializeTask = (t: Task & { i: number }) =>
      `  ${t.i}) [${t.priority}] ${t.title}`

    const serializeTaskGroup = (status: TaskStatus, onlyCount = false) => {
      const items = tasks.filter((t) => t.status === status)
      const ans = [`${status} (${items.length})`]
      if (!onlyCount) ans.push(...items.map(serializeTask))
      return ans
    }

    await this.standardReply(
      [
        ...serializeTaskGroup("running"),
        ...serializeTaskGroup("pending"),
        ...serializeTaskGroup("paused"),
        ...serializeTaskGroup("done", true),
        ...serializeTaskGroup("discarded", true),
      ].join("\n"),
      [
        // "todo list",
        // "todo filter [TITLE]",
        // "todo add [TITLE]",
        // "todo update [N] [STATUS]",
        // "todo rename [N] [NEW-TITLE]",
      ],
    )

    const preference = await this.getUserPreference()
    await prisma.wechatUser.update({
      where: { id: this.message.talker().id },
      data: {
        preference: {
          ...omit(preference, ["todoFilter"]),
          todoFilter: options?.filter,
        },
      },
    })
  }

  async addTodo(title: string) {
    await prisma.task.create({
      data: {
        ownerId: this.message.talker().id,
        title,
      },
    })
    return this.listOrFilterTodo()
  }

  async renameTodo(index: number, newTitle: string) {
    const tasks = await listTodo(this.message.talker().id)
    const task = tasks[index - 1]
    if (!task) throw new Error(`序号不合法！取值范围为[1-${tasks.length}]`)

    await prisma.task.update({
      where: { id: task.id },
      data: {
        title: newTitle,
      },
    })
    return this.listOrFilterTodo()
  }

  async setPriority(index: number, priority: Priority) {
    const tasks = await listTodo(this.message.talker().id)
    const task = tasks[index - 1]
    if (!task) throw new Error(`序号不合法！取值范围为[1-${tasks.length}]`)

    await prisma.task.update({
      where: { id: task.id },
      data: {
        priority,
      },
    })
    return this.listOrFilterTodo()
  }

  async updateTodo(index: number, status: TaskStatus, note?: string) {
    const tasks = await listTodo(this.message.talker().id)
    const task = tasks[index - 1]
    if (!task) throw new Error(`序号不合法！取值范围为[1-${tasks.length}]`)

    await prisma.task.update({
      where: { id: task.id },
      data: {
        status: status,
        notes: note
          ? {
              push: note,
            }
          : undefined,
      },
    })
    return this.listOrFilterTodo()
  }
}
