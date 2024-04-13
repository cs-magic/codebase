import { prisma } from "../../common-db/providers/prisma"
import { BaseManager } from "./base.manager"
import { TaskStatus } from ".prisma/client"

export class TodoManager extends BaseManager {
  async listTodo() {
    return prisma.task.findMany({
      where: { ownerId: this.message.talker().id },
    })
  }

  async listTodoAction() {
    const tasks = await this.listTodo()

    await this.standardReply(
      tasks.map((t, i) => `${i + 1}) ${t.title} (${t.status})`).join("\n"),
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
      return this.standardReply(`添加任务成功：${title}`, ["todo"])
    } else {
      throw new Error("新任务不能为空")
    }
  }

  async updateTodo(index: number, status: TaskStatus) {
    const tasks = await this.listTodo()
    const task = tasks[index - 1]
    if (!task) throw new Error(`序号不合法！取值范围为[1-${tasks.length}]`)

    const oldStatus = task.status
    await prisma.task.update({
      where: { id: task.id },
      data: {
        status: status,
      },
    })
    return this.standardReply(
      `任务(title=${task.title})更新成功！\n状态：${oldStatus} --> ${status}`,
      ["todo"],
    )
  }
}
