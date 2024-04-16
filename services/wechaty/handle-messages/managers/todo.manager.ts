import { parseAsyncWithFriendlyErrorMessage } from "@cs-magic/common/utils/parse-async-with-friendly-error-message"
import {
  TaskStatusSchema,
  TaskStatusType,
} from "@cs-magic/prisma/prisma/generated/zod/inputTypeSchemas/TaskStatusSchema"
import { z } from "zod"
import { prisma } from "../../../../packages/common-db/providers/prisma"
import { FeatureMap } from "../../schema/commands"
import { listTodo } from "../../utils/list-todo"
import { parseLimitedCommand } from "../../utils/parse-command"
import { BaseManager } from "./base.manager"
import { type TaskStatus } from ".prisma/client"

const commandTypeSchema = z.enum(["list", "add", "update", "rename"])
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
        type: "rename",
        description: "修改一个任务的标题",
      },
      更新: {
        type: "update",
        description: "更新一个任务的状态（待开始，进行中，已完成，已取消）",
      },
    },
  },
  en: {
    title: "Task Management",
    description: "",
    commands: {
      list: {
        type: "list",
        description: "list tasks",
      },
      add: {
        type: "add",
        description: "add a task with title",
      },
      rename: {
        type: "rename",
        description: "rename the title a task",
      },
      update: {
        type: "update",
        description:
          "update the status of a task (pending,running,done,discarded)",
      },
    },
  },
}

export class TodoManager extends BaseManager {
  public i18n = i18n

  /**
   * 1. input prefix ==> command type (zh/en --> enum)
   * 2. operate command
   *
   * @param input
   */
  async parse(input?: string) {
    const commands = this.i18n[await this.getLang()].commands
    const commandTypeSchema = z.enum(
      Object.keys(commands) as [string, ...string[]],
    )
    const parsed = parseLimitedCommand(input ?? "", commandTypeSchema)
    if (parsed) {
      const commandKeyInInput = parsed.command
      const commandKeyInEnum = commands[commandKeyInInput]
      const commandType = await commandTypeSchema.parseAsync(commandKeyInEnum)
      switch (commandType) {
        case "list":
          await this.listTodoAction()
          break

        case "add":
          await this.addTodo(parsed.args)
          break

        case "rename": {
          const m = /^\s*(\d+)\s*(.*?)\s*$/.exec(parsed.args)
          if (!m) throw new Error("输入不合法")
          const newTitle = await z.string().min(1).parseAsync(m?.[2])
          await this.renameTodo(Number(m[1]), newTitle)
          break
        }

        case "update": {
          const m = /^\s*(\d+)\s*(.*?)\s*$/.exec(parsed.args)
          if (!m) throw new Error("输入不合法")
          const newStatus =
            await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
              TaskStatusSchema,
              m?.[2],
            )
          await this.updateTodo(Number(m[1]), newStatus)
          break
        }
      }
    }
  }

  async listTodoAction() {
    const tasks = (await listTodo(this.message.talker().id)).map((k, i) => ({
      ...k,
      i: i + 1,
    }))

    const running = tasks.filter((t) => t.status === "running")
    const pending = tasks.filter((t) => t.status === "pending")
    const paused = tasks.filter((t) => t.status === "paused")
    const done = tasks.filter((t) => t.status === "done")
    const discarded = tasks.filter((t) => t.status === "discarded")

    await this.standardReply(
      [
        `Running (${running.length})`,
        ...running.map((t, i) => `  ${t.i}) ${t.title}`),
        `Pending (${pending.length})`,
        ...pending.map((t, i) => `  ${t.i}) ${t.title}`),
        `Paused (${paused.length})`,
        ...paused.map((t, i) => `  ${t.i}) ${t.title}`),
        `Done (${done.length})`,
        `Discarded (${discarded.length})`,
      ].join("\n"),
      ["add-todo", "update-todo"],
    )
  }

  async addTodo(title?: string) {
    if (title) {
      await prisma.task.create({
        data: {
          ownerId: this.message.talker().id,
          title,
        },
      })
      // return this.standardReply(`添加任务成功：${title}`, ["todo"])
      return this.listTodoAction()
    } else {
      throw new Error("新任务不能为空")
    }
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

    // const oldStatus = task.status
    // return this.standardReply(
    //   `任务(title=${task.title})更新成功！\n状态：${oldStatus} --> ${status}`,
    //   ["todo"],
    // )
    return this.listTodoAction()
  }

  async updateTodo(index: number, status: TaskStatus) {
    const tasks = await listTodo(this.message.talker().id)
    const task = tasks[index - 1]
    if (!task) throw new Error(`序号不合法！取值范围为[1-${tasks.length}]`)

    await prisma.task.update({
      where: { id: task.id },
      data: {
        status: status,
      },
    })

    // const oldStatus = task.status
    // return this.standardReply(
    //   `任务(title=${task.title})更新成功！\n状态：${oldStatus} --> ${status}`,
    //   ["todo"],
    // )
    return this.listTodoAction()
  }
}
