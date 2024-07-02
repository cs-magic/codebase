import fw from '@fastify/websocket';
import Fastify from 'fastify';
import { remove } from 'lodash';
import { genNanoId } from '@cs-magic/common/src/index';
import { logger } from '@cs-magic/log/logger';
import { createWechatyBot } from '@cs-magic/wechaty/create-wechaty-bot';
import { dumpFile } from '@cs-magic/common/utils/dump-file';
import { formatError } from '@cs-magic/common/utils/format-error';
import { getConvPreference } from '@cs-magic/wechaty/utils/get-conv-preference';
import { parseLimitedCommand } from '@cs-magic/wechaty/utils/parse-command';
import path from 'path';
import { z } from 'zod';

const transferMessage = (data, sockets) => {
    sockets.forEach((socket) => {
        socket.send(JSON.stringify(data));
    });
};

const syncClients = (context) => {
    const { bot, sockets, scan } = context;
    const loggedIn = bot?.isLoggedIn ?? false;
    transferMessage({ type: "loggedIn", data: loggedIn }, sockets);
    // avoid bot.currentUser to catch errors
    if (loggedIn) {
        const user = bot?.currentUser.payload;
        if (user)
            transferMessage({ type: "login", data: user }, sockets);
    }
    else if (scan) {
        transferMessage({ type: "scan", data: scan }, sockets);
    }
};

const startBot = async (context) => {
    // 避免重复登录，会导致 padLocal 报错
    if (!context.bot) {
        logger.info("-- creating bot, context: %o", context);
        context.bot = createWechatyBot()
            .on("scan", (value, status) => {
            context.scan = { value, status };
            logger.info(`updated scan: ${JSON.stringify(context.scan)}`);
            transferMessage({ type: "scan", data: context.scan }, context.sockets);
        })
            .on("login", (user) => {
            // console.log("-- login: ", user)
            context.scan = null;
            syncClients(context);
        });
    }
    // todo: if has cache,  start auto, o.w. wait for triggering in the frontend ?
    if (!context.bot.isLoggedIn) {
        logger.info("-- starting bot, context: %o", context);
        await context.bot.start();
    }
};

const botCommandTypeSchema = z.enum([
    "start",
    "stop",
    "state",
    "logout",
    "update-token",
    "get-preference",
    "set-preference",
    "get-contacts",
]);

const wechatyDataPath = path.join(process.cwd(), "wechaty.data.json");
const handleMessage = async (context, messageBuffer, socketId) => {
    try {
        const socket = context.sockets.find((s) => s.id === socketId);
        const message = messageBuffer.toString();
        const result = parseLimitedCommand(messageBuffer.toString(), botCommandTypeSchema);
        logger.debug({ message, result });
        if (!result)
            return context;
        switch (result.command) {
            case "start":
                await context.bot?.stop();
                await startBot(context);
                break;
            case "stop":
                await context.bot?.stop();
                syncClients(context);
                break;
            case "logout":
                await context.bot?.logout();
                syncClients(context);
                break;
            case "update-token": {
                const data = {
                    puppet: {
                        padlocal: {
                            token: `puppet_padlocal_${result.args}`,
                        },
                    },
                };
                await dumpFile(data, { fp: wechatyDataPath });
                // 切换 iPad 设备时，如果不先退出登录，在另一个设备登录后手机会被强制重新登陆，并限制扫码功能（需要好友解封）
                // todo 2024-04-27 09:23:31: 验证先退出登录后，是否可以有效缓解这个问题，如果不行的话只能直接买号了
                logger.info("logging out");
                await context.bot?.logout();
                logger.info("logged out");
                logger.info("starting new bot");
                await startBot(context);
                logger.info("started new bot");
                break;
            }
            case "get-contacts": {
                const contacts = (await context.bot?.Contact.findAll()) ?? [];
                const data = {
                    type: "contacts",
                    data: contacts.map((c) => c.payload),
                };
                // console.log("contacts data: ", data.data.slice(0, 5))
                socket.send(JSON.stringify(data));
                break;
            }
            case "get-preference": {
                const convId = result.args;
                const preference = await getConvPreference({ convId });
                logger.debug(`preference: %o`, preference);
                const data = {
                    type: "preference",
                    data: preference,
                };
                socket.send(JSON.stringify(data));
                break;
            }
            case "set-preference":
                // todo
                break;
            default:
                break;
        }
        // logger.debug(`parsed command: ${result.command} ${result.args}`)
    }
    catch (e) {
        formatError(e);
    }
    return context;
};

logger.info("fastify initializing...");
const fastify = Fastify({
    logger: true,
});
// socket
void fastify.register(fw);
void fastify.register(async function (fastify) {
    // init context
    let context = {
        bot: null,
        scan: null,
        sockets: [],
    };
    await startBot(context);
    fastify.get("/context", {}, async () => {
        const bot = context.bot;
        return {
            bot: {
                id: bot?.id,
                name: bot?.name,
                scan: context.scan,
            },
        };
    });
    fastify.get("/ws", { websocket: true }, async (socket /* WebSocket */, req /* FastifyRequest */) => {
        // The WebSocket connection is established at this point, ref: https://chat.openai.com/c/41683f6c-265f-4a36-ae33-4386970bd14c
        const id = genNanoId();
        socket.id = id;
        socket.on("close", () => {
            remove(context.sockets, (s) => s.id === id);
        });
        socket.on("message", async (m) => {
            context = await handleMessage(context, m, id);
        });
        context.sockets.push(socket);
        syncClients({
            ...context,
            // only self to update upon init
            sockets: [socket],
        });
    });
});
// http
fastify.get("/", async function handler(request, reply) {
    return { hello: "world" };
});
try {
    logger.info("fastify listening...");
    void fastify.listen({ port: Number(process.env.PORT ?? 40414) });
}
catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
