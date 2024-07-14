import {
  ITaskDetail,
  logger,
  parseFunction,
  SEPARATOR_LINE,
  taskDetailSchema,
} from "@cs-magic/common"
import { prisma } from "@cs-magic/os"
import chain from "lodash/chain"
import omit from "lodash/omit.js"
import sortBy from "lodash/sortBy.js"
import { Job } from "node-schedule"
import { Message } from "wechaty-puppet/payloads"
import { Priority } from "../../../../../swot-bot-core/src/schema/priority"

import { type TaskStatus } from ".prisma/client"

export type ITaskWithIndex = ITaskDetail & {
  index: number
}

export const taskStatusMap: Record<TaskStatus, string> = {
  done: "已完成",
  paused: "已暂停",
  pending: "待开始",
  running: "进行中",
  discarded: "已取消",
}

const serializeTaskGroup = (
  tasks: ITaskWithIndex[],
  status: TaskStatus,
  onlyCount = false,
  showRoom?: boolean,
) => {
  const items = sortBy(
    tasks.filter((t) => t.status === status),
    // .map((t) => {
    //   if (!t.priority) t.priority = Priority.normal // possible null
    //   return t
    // })
    "priority",
  )
  const ans = [`${taskStatusMap[status]}（数量：${items.length}）`]

  if (!onlyCount) {
    const arr = chain(items)
      .groupBy("priority")
      .entries()
      .map(([priority, items]) => [
        `-- P${priority}`,
        ...items.map((t) => {
          const roomName = t.conv?.topic
          return `${t.index}) ${t.title} ${showRoom && roomName ? `(${roomName})` : ""}`
        }),
      ])
      // !important
      .value()
      .flat()
    ans.push(...arr)
  }
  return ans
}

/**
 * task 插件 用于辅助个人进行备忘管理，支持：
 *  - 新增任务
 *  - 查询任务
 *  - 更新任务状态
 *  - 更新任务优先级
 *  - 添加笔记
 *  - 在任务上添加定时提醒
 *  - 在任务上移除定时提醒
 *
 * task 比较私密，所以不适合跨会话共享，因此是会话级（而非用户级）
 *
 * - 用户在私聊时可以查看自己的（可更新），以及自己所在的所有群的 task 列表（不可更新）
 * - 用户在群聊时只可以查看该群聊的 task 列表（可更新）
 *
 */
export class TaskService {
  private message: Message

  constructor(message: Message) {
    this.message = message
  }

  async list(): Promise<ITaskWithIndex[]> {
    const tasksInDB = await prisma.task.findMany({
      ...taskDetailSchema,
      orderBy: {
        createdAt: "asc",
      },
      where: this.message.roomId
        ? {
            conv: {
              id: this.message.roomId,
            },
          }
        : {
            conv: {
              OR: [
                {
                  memberIdList: {
                    has: this.message.talkerId,
                  },
                },
                {
                  id: this.message.talkerId,
                },
              ],
            },
          },
    })

    const tasks = tasksInDB.map((t, index) => ({ ...t, index }))
    // todo: bug if turns on
    // console.log("tasks: ", tasks)
    logger.debug("tasks: \n%o", tasks)
    return tasks
  }

  async format() {
    const tasks = await this.list()
    const showRoom = !this.message.roomId
    const s = [
      `任务列表（数量：${tasks.length}）`,
      SEPARATOR_LINE,
      ...serializeTaskGroup(tasks, "running", false, showRoom),
      SEPARATOR_LINE,
      ...serializeTaskGroup(tasks, "pending", false, showRoom),
      SEPARATOR_LINE,
      ...serializeTaskGroup(tasks, "paused", false, showRoom),
      SEPARATOR_LINE,
      ...serializeTaskGroup(tasks, "done", true, showRoom),
      SEPARATOR_LINE,
      ...serializeTaskGroup(tasks, "discarded", true, showRoom),
    ].join("\n")
    logger.debug(`list: ${s}`)
    return s
  }

  async add(
    title: string,
    priority?: Priority,
    timer?: Job,
    description?: string,
    status?: TaskStatus,
  ) {
    const s = await prisma.task.create({
      data: {
        conv: this.message.roomId
          ? {
              connectOrCreate: {
                where: { id: this.message.roomId },
                create: {
                  id: this.message.roomId,
                },
              },
            }
          : {
              connectOrCreate: {
                where: { id: this.message.talkerId },
                create: {
                  id: this.message.talkerId,
                },
              },
            },
        title,
        priority,
        // todo: string repr of Job
        // timer: timer.name,
        description,
        status,
      },
    })
    logger.debug(`added: %o`, s)
    return s
  }

  async update(index: number, func: string) {
    const tasks = await this.list()
    const task = tasks[index]
    if (!task) return
    logger.debug(`func: %o`, func)
    logger.debug(`task before: \n%o`, task)
    parseFunction(func).bind(task)()
    logger.debug(`task after: \n%o`, task)

    const s = await prisma.task.update({
      where: { id: task.id },
      data: omit(task, [
        "index",
        // todo: why incompatible
        "timer",
        "conv",
      ]),
    })
    logger.debug("updated: %o", s)
    return s
  }
}
