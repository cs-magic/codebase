import { parseFunction } from "@cs-magic/common/utils/parse-function"
import { logger } from "@cs-magic/log/logger"
import omit from "lodash/omit"
import sortBy from "lodash/sortBy"
import { Job } from "node-schedule"
import { Message } from "wechaty-puppet/payloads"
import { prisma } from "../../../../../packages-to-classify/db/providers/prisma"
import { Priority } from "./task.plugin"
import { Task, type TaskStatus } from ".prisma/client"

export interface ITask extends Task {
  index: number
}

const serializeTaskGroup = (
  tasks: ITask[],
  status: TaskStatus,
  onlyCount = false,
  roomName?: string,
  showRoom?: boolean,
) => {
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
    ans.push(
      ...items.map(
        (t) =>
          `  ${t.index}) ${t.title} ${showRoom && roomName ? `(${roomName})` : ""} [${t.priority}]`,
      ),
    )
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

  async list() {
    const tasks = await prisma.task.findMany({
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
    return tasks.map((t, index) => ({ ...t, index }))
  }

  async format() {
    const tasks = await this.list()
    // todo:
    const roomName = this.message.roomId
    const showRoom = !this.message.roomId
    const s = [
      ...serializeTaskGroup(tasks, "running", false, roomName, showRoom),
      ...serializeTaskGroup(tasks, "pending", false, roomName, showRoom),
      ...serializeTaskGroup(tasks, "paused", false, roomName, showRoom),
      ...serializeTaskGroup(tasks, "done", true, roomName, showRoom),
      ...serializeTaskGroup(tasks, "discarded", true, roomName, showRoom),
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
    logger.debug(`task before: %o`, task)
    parseFunction(func).bind(task)()
    logger.debug(`task after: %o`, task)

    const s = await prisma.task.update({
      where: { id: task.id },
      data: omit(task, [
        "index",
        // todo: why incompatible
        "timer",
      ]),
    })
    logger.debug("updated: %o", s)
    return s
  }
}
