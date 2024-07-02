import { ITaskDetail } from "@cs-magic/prisma/schema/task";
import { Job } from "node-schedule";
import { Message } from "wechaty-puppet/payloads";
import { Priority } from "./task.plugin";
import { type TaskStatus } from ".prisma/client";
export type ITaskWithIndex = ITaskDetail & {
    index: number;
};
export declare const taskStatusMap: Record<TaskStatus, string>;
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
export declare class TaskService {
    private message;
    constructor(message: Message);
    list(): Promise<ITaskWithIndex[]>;
    format(): Promise<string>;
    add(title: string, priority?: Priority, timer?: Job, description?: string, status?: TaskStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        convId: string | null;
        notes: string[];
        priority: number;
        timer: import(".prisma/client").Prisma.JsonValue;
    }>;
    update(index: number, func: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        convId: string | null;
        notes: string[];
        priority: number;
        timer: import(".prisma/client").Prisma.JsonValue;
    } | undefined>;
}
