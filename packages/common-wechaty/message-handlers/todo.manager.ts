import { prisma } from "../../common-db/providers/prisma"
import { listTodo } from "../utils/list-todo"
import { BaseManager } from "./base.manager"
import { TaskStatus } from ".prisma/client"

export class TodoManager extends BaseManager {
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
