import { ERR_MSG_INVALID_INPUT, SEPARATOR_LINE } from "@cs-magic/common/const"
import { parseJsonSafe } from "@cs-magic/common/utils/parse-json-safe"
import { taskStatusSchema, TaskTimer } from "@cs-magic/prisma/schema/task"
import omit from "lodash/omit"
import sortBy from "lodash/sortBy"
import { Job, scheduleJob } from "node-schedule"
import { z } from "zod"
import moment from "../../../../packages-to-classify/datetime/moment"
import { prisma } from "../../../../packages-to-classify/db/providers/prisma"
import { FeatureMap, FeatureType } from "../../schema/commands"
import { listConvTodo } from "../../utils/list-conv-todo"
import { parseLimitedCommand } from "../../utils/parse-command"
import {
  parseIndex,
  parsePriorities,
  parseTimer,
} from "../../utils/parse-indices-number"
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
  "filter",
  "add",
  "set-priorities",
  "set-status",
  "set-title",
  "add-note",
  "set-timer",
  "unset-timer",
])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
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
      filter: {
        type: "filter",
        description: "filter todo in case of it's too long",
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
      "set-priorities": {
        type: "set-priorities",
      },
      "add-note": {
        type: "add-note",
      },
      "set-timer": {
        type: "set-timer",
      },
      "unset-timer": {
        type: "unset-timer",
      },
    },
  },
}

export class TodoManager extends BaseManager {
  static name: FeatureType = "todo"
  public i18n = i18n
  static jobs: Record<string, Job> = {}

  async help() {
    const commands = await this.getCommands()
    const desc = await this.getDescription()
    await this.standardReply(
      [desc].join("\n"),
      Object.keys(commands).map(
        (command) => `  ${TodoManager.name} ${command}`,
      ),
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

    const commands = this.i18n[await this.getLang()]?.commands
    if (!commands) return

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
          if (!m) throw new Error("输入不合法")
          const index = Number(m[1])
          const newStatus = await taskStatusSchema.parseAsync(m?.[2])
          const note = m?.[3]
          await this.updateTodo(index, newStatus, note)
          break
        }

        case "set-priorities": {
          const { priority, indices } = await parsePriorities(parsed.args)
          await this.setPriorities(indices, priority)
          break
        }

        case "set-timer": {
          const { index, timer } = await parseTimer(parsed.args)
          await this.setTimer(index, timer)
          break
        }

        case "unset-timer": {
          const { index, reason } = await parseIndex(parsed.args)
          await this.unsetTimer(index, reason)
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
    const tasks = (await listConvTodo(this.message))
      .map((k, i) => ({
        ...k,
        i,
      }))
      .filter(
        (item) =>
          !options?.filter || item.title.toLowerCase().includes(options.filter),
      )

    const serializeTaskGroup = (status: TaskStatus, onlyCount = false) => {
      const items = sortBy(
        tasks
          .filter((t) => t.status === status)
          .map((t) => {
            if (!t.priority) t.priority = Priority.normal // possible null
            return t
          }),
        "priority",
      )
      const ans = [`${status} (${items.length})`]
      if (!onlyCount)
        ans.push(...items.map((t) => `  ${t.i}) ${t.title} [${t.priority}]`))
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
        roomId: this.message.room()?.id,
        ownerId: this.message.talker().id,
        title,
      },
    })
    return this.listOrFilterTodo()
  }

  async renameTodo(index: number, newTitle: string) {
    const tasks = await listConvTodo(this.message)
    const task = tasks[index]
    if (!task) throw new Error(ERR_MSG_INVALID_INPUT)

    await prisma.task.update({
      where: { id: task.id },
      data: {
        title: newTitle,
      },
    })
    return this.listOrFilterTodo()
  }

  /**
   *
   * @param index
   * @param reason todo
   */
  async unsetTimer(index: number, reason?: string) {
    const tasks = await listConvTodo(this.message)
    const task = tasks[index]
    if (!task) throw new Error("task not exists")

    const job = TodoManager.jobs[task.id]
    if (!job) throw new Error("task without job")
    job.cancel()

    delete TodoManager.jobs[task.id]

    await prisma.task.update({
      where: { id: task.id },
      data: {
        timer: JSON.stringify({
          ...parseJsonSafe<TaskTimer>(task.timer),
          disabled: true,
        }),
      },
    })
    await this.conv.say("√ unset")
  }

  async setTimer(index: number, timer: string) {
    const tasks = await listConvTodo(this.message)
    const task = tasks[index]
    if (!task) throw new Error("task not exists")

    const conv = task.roomId
      ? await this.bot.Room.find({ id: task.roomId })
      : await this.bot.Contact.find({ id: task.ownerId! })
    if (!conv) throw new Error("not found cov")

    let job = TodoManager.jobs[task.id]
    if (job) job.cancel()

    job = TodoManager.jobs[task.id] = scheduleJob(timer, async () => {
      await conv.say(
        [
          "⏰ " + task.title + " 开始啦~",
          SEPARATOR_LINE,
          `${moment().format("MM-DD HH:mm")} (${timer})`,
        ].join("\n"),
      )
    })
    console.log("jobs: ", TodoManager.jobs)

    const nextTime = moment(new Date(job.nextInvocation()))
    console.log({ nextTime })

    if (job) {
      await prisma.task.update({
        where: { id: task.id },
        data: {
          timer: JSON.stringify({
            ...parseJsonSafe<TaskTimer>(task.timer),
            disabled: false,
          }),
        },
      })
      await conv.say(
        `设置成功，下一次提醒在：${nextTime.format("MM-DD HH:mm")}`,
      )
    } else {
      await conv.say(`设置失败，原因：非法输入`)
    }
  }

  async setPriorities(indices: number[], priority: Priority) {
    // find tasks of talker
    const tasks = await listConvTodo(this.message)
    const ids = indices.map((i) => tasks[i]?.id).filter((v) => !!v) as string[]
    const updated = await prisma.task.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        priority,
      },
    })
    console.log({ priority, indices, ids, updated })
    return this.listOrFilterTodo()
  }

  async updateTodo(index: number, status: TaskStatus, note?: string) {
    const tasks = await listConvTodo(this.message)
    const task = tasks[index]
    if (!task) throw new Error(ERR_MSG_INVALID_INPUT)

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
