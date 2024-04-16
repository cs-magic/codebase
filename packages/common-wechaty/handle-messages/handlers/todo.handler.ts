import { parseAsyncWithFriendlyErrorMessage } from "@cs-magic/common/utils/parse-async-with-friendly-error-message"
import { type TaskStatusType } from "@cs-magic/p01-card/prisma/generated/zod/inputTypeSchemas/TaskStatusSchema"
import { TaskStatusSchemaRootProjectsP01Card } from "@cs-magic/p01-card/test"
import { TaskStatusSchemaRootProjectsP01CardTests } from "@cs-magic/p01-card/tests/test"
import { type MessageInterface } from "wechaty/impls"
import { type z } from "zod"
import { TaskStatusSchemaRootProjectsP02 } from "p02/test"
import { TaskStatusSchemaRootProjects } from "../../../../projects/test"
import { TaskStatusSchemaRoot } from "../../../../test"

import { BackendType, backendTypeSchema } from "../../../common-llm/schema/llm"
import { getConvPreference } from "../../utils/get-conv-preference"
import { parseCommand } from "../../utils/parse-command"
import { BaseHandler } from "./base.handler"
import { todoCommands } from "./todo.commands"
import { TodoManager } from "./todo.manager"

export class TodoHandler extends BaseHandler {
  public async onMessage(message: MessageInterface) {
    const preference = await getConvPreference(message)
    const title = preference.lang === "zh" ? "任务管理" : "Task Management"
    const manager = (this.manager = new TodoManager(this.bot, title, message))

    const result = parseCommand<z.infer<typeof todoCommands>>(
      message.text(),
      todoCommands,
    )
    if (!result) return

    switch (result.command) {
      case "todo":
      case "list-todo":
        return manager.listTodoAction()

      case "add-todo":
        return manager.addTodo(result.args)

      case "update-todo":
        const m = /^\s*(\d+)\s*(.*?)\s*$/.exec(result.args)
        if (!m) throw new Error("输入不合法")

        await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
          TaskStatusSchemaRoot,
          m?.[2],
        )
        await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
          TaskStatusSchemaRootProjects,
          m?.[2],
        )

        await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
          TaskStatusSchemaRootProjectsP01Card,
          m?.[2],
        )

        await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
          TaskStatusSchemaRootProjectsP01CardTests,
          m?.[2],
        )

        await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
          TaskStatusSchemaRootProjectsP02,
          m?.[2],
        )

        const status = await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
          // todo: not warn in p01-card
          TaskStatusSchemaRootProjectsP01Card,
          m?.[2],
        )
        const status2 = await parseAsyncWithFriendlyErrorMessage<BackendType>(
          backendTypeSchema,
          m?.[2],
        )
        return manager.updateTodo(Number(m[1]), status)
    }
  }
}
