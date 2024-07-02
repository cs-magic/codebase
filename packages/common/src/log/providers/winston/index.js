import winston from "winston";
import { consoleTransport, fileRotateTransport } from "./transports";
export const winstonLogger = winston.createLogger({
    level: "info",
    transports: [consoleTransport, fileRotateTransport],
});
