import { z } from "zod";
import { BasePlugin } from "./base.plugin";
const commandTypeSchema = z.enum([
    "enable-announce",
    "disable-announce",
    "set-announce-n",
]);
const i18n = {
    en: {
        title: "Room Administration",
        description: "",
        commands: {
            "enable-announce": {
                type: "enable-announce",
            },
            "disable-announce": {
                type: "disable-announce",
            },
            "set-announce-n": {
                type: "set-announce-n",
            },
        },
    },
};
export class RoomPlugin extends BasePlugin {
    i18n = i18n;
}
