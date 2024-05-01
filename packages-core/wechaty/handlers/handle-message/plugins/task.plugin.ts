import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { parseCommand } from "@cs-magic/common/utils/parse-command"
import { parseJsonSafe } from "@cs-magic/common/utils/parse-json"
import { logger } from "@cs-magic/log/logger"
import { TaskTimer } from "@cs-magic/prisma/schema/task"
import { Job, scheduleJob } from "node-schedule"
import { z } from "zod"
import moment from "../../../../../packages-to-classify/datetime/moment"
import { prisma } from "../../../../../packages-to-classify/db/providers/prisma"
import { FeatureMap, FeatureType } from "../../../schema/commands"
import { listConvTodo } from "../../../utils/list-conv-todo"
import { BasePlugin } from "./base.plugin"
import { TaskService } from "./task.service"

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
  "update",
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
      add: {
        type: "add",
        description: "add a todo with title",
      },
      update: {
        type: "update",
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

export class TaskPlugin extends BasePlugin {
  static name: FeatureType = "todo"
  // todo: global jobs
  static jobs: Record<string, Job> = {}
  public i18n = i18n

  async help() {
    const commands = await this.getCommands()
    const desc = await this.getDescription()
    await this.standardReply(
      [desc].join("\n"),
      Object.keys(commands).map((command) => `  ${TaskPlugin.name} ${command}`),
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

    const commands = await this.getCommands()
    if (!commands) return

    const service = new TaskService(this.message.payload!)
    const sync = async () => this.reply(await service.format())

    const parsed = parseCommand(input)
    logger.debug("parsed: %o", parsed)

    switch (parsed._[0]) {
      case "list":
        await sync()
        break

      case "add":
        const title = z
          .string()
          .trim()
          .min(1)
          .parse(parsed._.slice(1).join(" "))
        await service.add(title)
        // todo: better input
        await sync()
        break

      case "update": {
        const index = z.number().int().min(0).parse(parsed._[1])
        const rest = parsed._.slice(2).join(" ")
        await service.update(index, rest)
        await sync()
        break
      }

      case "set-timer": {
        const index = z.number().int().min(0).parse(parsed._[1])
        const rest = parsed._.slice(2).join(" ")
        await this.setTimer(index, rest)
        await sync()
        break
      }

      case "unset-timer": {
        const index = z.number().int().min(0).parse(parsed._[1])
        const rest = parsed._.slice(2).join(" ")
        await this.unsetTimer(index, rest)
        await sync()
        break
      }
    }
  }

  async setTimer(index: number, timer: string) {
    const tasks = await listConvTodo(this.message)
    const task = tasks[index]
    if (!task) throw new Error("task not exists")

    const conv = task.roomId
      ? await this.bot.Room.find({ id: task.roomId })
      : await this.bot.Contact.find({ id: task.ownerId! })
    if (!conv) throw new Error("not found cov")

    let job = TaskPlugin.jobs[task.id]
    if (job) job.cancel()

    logger.debug(`setting timer: %o`, { index, timer })
    job = TaskPlugin.jobs[task.id] = scheduleJob(timer, async () => {
      await conv.say(
        [
          "⏰ " + task.title + " 开始啦~",
          SEPARATOR_LINE,
          `${moment().format("MM-DD HH:mm")} (${timer})`,
        ].join("\n"),
      )
    })
    console.log("jobs: ", TaskPlugin.jobs)

    const nextTime = moment(new Date(job.nextInvocation()))
    console.log({ nextTime })

    await prisma.task.update({
      where: { id: task.id },
      data: {
        timer: JSON.stringify({
          ...parseJsonSafe<TaskTimer>(task.timer),
          disabled: !job,
        }),
      },
    })
    await conv.say(
      job
        ? `设置成功，下一次提醒在：${nextTime.format("MM-DD HH:mm")}`
        : `设置失败，原因：非法输入`,
    )
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

    const job = TaskPlugin.jobs[task.id]
    if (!job) throw new Error("task without job")
    job.cancel()

    delete TaskPlugin.jobs[task.id]

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
}
