import { Job } from "node-schedule";
import { FeatureMap, FeatureType } from "../../../schema/commands";
import { BasePlugin } from "./base.plugin";
import { TaskService } from "./task.service";
export declare enum Priority {
    highest = 1,
    high = 3,
    normal = 5,
    low = 7,
    lowest = 9
}
export declare class TaskPlugin extends BasePlugin {
    static name: FeatureType;
    static jobs: Record<string, Job>;
    i18n: FeatureMap<"update" | "add" | "list" | "set-timer" | "unset-timer">;
    service: TaskService;
    sync: () => Promise<void>;
    help(): Promise<void>;
    /**
     * 1. input prefix ==> command type (zh/en --> enum)
     * 2. operate command
     *
     * @param input
     */
    parse(input?: string): Promise<void>;
    setTimer(index: number, timer: string): Promise<void>;
    /**
     *
     * @param index
     * @param reason todo
     */
    unsetTimer(index: number, reason?: string): Promise<void>;
}
