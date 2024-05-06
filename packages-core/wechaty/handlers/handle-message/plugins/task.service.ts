import { parseFunction } from "@cs-magic/common/utils/parse-function"
import { logger } from "@cs-magic/log/logger"
import { ITaskDetail, taskDetailSchema } from "@cs-magic/prisma/schema/task"
import omit from "lodash/omit"
import sortBy from "lodash/sortBy"
import groupBy from "lodash/groupBy"
import { Job } from "node-schedule"
import { Message } from "wechaty-puppet/payloads"
import { prisma } from "../../../../../packages-to-classify/db/providers/prisma"
import { Priority } from "./task.plugin"
import { type TaskStatus } from ".prisma/client"
import _ from "lodash"

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
  const ans = [`${taskStatusMap[status]} (${items.length})`]

  if (!onlyCount) {
    const arr = _(items)
      .groupBy("priority")
      .entries()
      .map(([priority, items]) => [
        `-- 优先级：${priority}`,
        ...items.map((t) => {
          const roomName = t.room?.topic
          return `  ${t.index}) ${t.title} ${showRoom && roomName ? `(${roomName})` : ""}`
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
            roomId: this.message.roomId,
          }
        : {
            OR: [
              { ownerId: this.message.talkerId },
              {
                room: {
                  memberIdList: {
                    has: this.message.talkerId,
                  },
                },
              },
            ],
          },
    })
    const tasks = tasksInDB.map((t, index) => ({ ...t, index }))
    // logger.debug("tasks: \n%o", tasks)
    return tasks
  }

  async format() {
    const tasks = await this.list()
    const showRoom = !this.message.roomId
    const s = [
      ...serializeTaskGroup(tasks, "running", false, showRoom),
      ...serializeTaskGroup(tasks, "pending", false, showRoom),
      ...serializeTaskGroup(tasks, "paused", false, showRoom),
      ...serializeTaskGroup(tasks, "done", true, showRoom),
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
        room: this.message.roomId
          ? {
              connectOrCreate: {
                where: { id: this.message.roomId },
                create: {
                  id: this.message.roomId,
                },
              },
            }
          : undefined,
        owner: {
          connectOrCreate: {
            where: { id: this.message.talkerId },
            create: {
              id: this.message.talkerId,
              name: this.message.talkerId, // hack name
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
        "room",
        "owner",
      ]),
    })
    logger.debug("updated: %o", s)
    return s
  }
}
