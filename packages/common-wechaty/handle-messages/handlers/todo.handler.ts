import taskStatusSchema, {
  TaskStatusType,
} from "@cs-magic/p01-card/prisma/generated/zod/inputTypeSchemas/TaskStatusSchema";
import { type MessageInterface } from "wechaty/impls";
import { z } from "zod";
import { getConvPreference } from "../../utils/get-conv-preference";
import { parseCommand } from "../../utils/parse-command";
import { parseAsyncWithFriendlyErrorMessage } from "../../utils/validate-input";
import { BaseHandler } from "./base.handler";
import { todoCommands } from "./todo.commands";
import { TodoManager } from "./todo.manager";

export class TodoHandler extends BaseHandler {
  public async onMessage(message: MessageInterface) {
    const preference = await getConvPreference(message);
    const title = preference.lang === "zh" ? "任务管理" : "Task Management";
    const manager = new TodoManager(this.bot, title, message);

    const result = parseCommand<z.infer<typeof todoCommands>>(
      message.text(),
      todoCommands,
    );
    if (!result) return;

    switch (result.command) {
      case "todo":
      case "list-todo":
        return manager.listTodoAction();

      case "add-todo":
        return manager.addTodo(result.args);

      case "update-todo":
        const m = /^\s*(\d+)\s*(.*?)\s*$/.exec(result.args);
        if (!m) throw new Error("输入不合法");
        const status = await parseAsyncWithFriendlyErrorMessage<TaskStatusType>(
          taskStatusSchema,
          m?.[2],
        );
        return manager.updateTodo(Number(m[1]), status);
    }
  }
}
