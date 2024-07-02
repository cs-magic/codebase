import { format } from "winston";
export const basicFormat = format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`);
