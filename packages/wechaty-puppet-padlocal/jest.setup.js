import { CustomConsole } from "@jest/console";
function simpleFormatter(_type, message) {
    return message
        .split(/\n/)
        .map((line) => line)
        .join("\n");
}
global.console = new CustomConsole(process.stdout, process.stderr, simpleFormatter);
