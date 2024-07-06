import { prisma, parseJsonSafe, logger, formatError, sleep, formatAction, formatDuration, SEPARATOR_LINE, LogLevel, config, moment, SEPARATOR_BOX, wechatMessageDetailSchema, formatString, NotImplementedError, evalObject, parseUrlFromWechatUrlMessage, isWxmpArticleUrl, parseTitleFromWechatUrlMessage, CardSimulator, taskDetailSchema, parseFunction, parseCommand, logEnv, env } from '@cs-magic/common';
import { types, ScanStatus, WechatyBuilder } from 'wechaty';
import qrcodeTerminal from 'qrcode-terminal';
import yaml from 'js-yaml';
import _, { omit, merge, set, sortBy, last } from 'lodash';
import { z } from 'zod';
import { deserializeMsg, puppetVersion } from 'wechaty-puppet';
import { safeCallLLM } from '@cs-magic/llm/utils/safe-call-llm';
import { trimMessages } from '@cs-magic/llm/utils/trim-messages';
import { wxmpUrl2preview } from '@cs-magic/swot-core/utils/wxmp-url2preview';
import { FileBox } from 'file-box';
import { llmModelTypeSchema } from '@cs-magic/llm/schema/llm.models';
import { scheduleJob } from 'node-schedule';
import yargsParser from 'yargs-parser';

const getConvRow = async (message) => {
    return prisma.wechatConv.findUnique({
        where: { id: message.convId },
    });
};

var CommandStyle;
(function (CommandStyle) {
    CommandStyle["standard"] = "standard";
    // omit title/footer
    CommandStyle["simple"] = "simple";
    // convert to image
    CommandStyle["image"] = "image";
})(CommandStyle || (CommandStyle = {}));
const defaultWechatPreference = {
    display: {
        lang: "en",
        maxLines: 100,
        style: CommandStyle.simple,
    },
    on: {
        roomJoin: {
            sayAnnounce: {
                enabled: true,
                n: 5,
            },
        },
        message: {
            image: {
                describe: {
                    enabled: false,
                },
            },
        },
    },
    features: {
        chatter: {
            enabled: true,
            model: "gpt-3.5-turbo",
        },
        parser: {
            enabled: true,
            options: {
                detail: {
                    request: {
                        backendType: "nodejs",
                        approach: {
                            type: "simulate",
                            headless: true,
                        },
                    },
                    summary: {
                        enabled: false,
                        model: "gpt-3.5-turbo",
                        withImage: false,
                    },
                },
                stat: {
                    enabled: false,
                },
                comments: {
                    enabled: false,
                },
                withCache: true,
            },
        },
        todo: {
            enabled: true,
            filter: undefined,
        },
    },
};
const defaultWechatData = {
    room: {
        newInvitees: [],
        welcome: {
            sent: false,
        },
    },
    balance: 0,
    vipLevel: 0,
    plugin: {
        chatter: {
            turnOnReminded: false,
            called: 0,
            success: 0,
        },
        parser: {
            called: 0,
            success: 0,
        },
    },
};

const getRobustPreference = (row) => {
    // migrate
    const rawPreference = omit(parseJsonSafe(row?.preference), [
        "chatterEnabled",
        "parserEnabled",
        "model",
        "lang",
        "backend",
        "features.image",
    ]);
    // todo: merge 的最佳实践 【限制default schema】
    const preference = merge({ ...defaultWechatPreference }, rawPreference);
    // logger.debug(JSON.stringify({ rawPreference, preference }, null, 2))
    return preference;
};
const getRobustData = (row) => {
    return merge({ ...defaultWechatData }, parseJsonSafe(row?.data));
};

const getConvPreference = async (message) => {
    const row = await getConvRow(message);
    return getRobustPreference(row);
};
const getConvData = async (message) => {
    const row = await getConvRow(message);
    return getRobustData(row);
};

class SenderQueue {
    static queue;
    static processing;
    static qps;
    constructor(qps = 10) {
        const QPS_MAX = 100;
        if (qps > QPS_MAX) {
            qps = QPS_MAX;
            logger.warn(`qps limited to be the max = ${QPS_MAX}`);
        }
        SenderQueue.qps = qps;
        SenderQueue.queue = [];
        SenderQueue.processing = false;
    }
    get cnt() {
        return SenderQueue.queue.length;
    }
    async addTask(task) {
        SenderQueue.queue.push(task);
        logger.info(`🌈task (cnt=${this.cnt})`);
        if (!SenderQueue.processing) {
            SenderQueue.processing = true;
            await this._runTask();
        }
    }
    async _runTask() {
        while (SenderQueue.queue.length > 0) {
            try {
                const task = SenderQueue.queue.shift();
                // logger.info(`⏳ task(cnt=${this.cnt})`)
                await task();
                logger.info(`✅ task (cnt=${this.cnt})`);
            }
            catch (e) {
                formatError(e);
            }
            finally {
                await sleep(1000 / SenderQueue.qps); // 限时
            }
        }
        SenderQueue.processing = false;
    }
}

const initBotContext = async (bot) => {
    const name = "飞脑";
    const version = process.env.npm_package_version ?? "0.1.0";
    const startTime = Date.now();
    // web protocol needs, o.w. rooms/contacts are loaded PARTIALLY
    await formatAction(bot.ready, "waiting bot ready");
    const rooms = await bot.Room.findAll();
    await Promise.all(rooms.map(async (room, index) => {
        logger.debug(`[${index + 1}] Room(id=${room.id}, topic=${await room.topic()})`);
    }));
    // wrap
    const senderQueue = new SenderQueue(10);
    // expose
    const addSendTask = async (task) => senderQueue.addTask(task);
    const puppet = bot.puppet;
    const puppetName = puppet.name();
    const botData = {
        name,
        version,
        startTime,
        jobs: [], // todo: await prisma.task.findMany({where: {timer: {})
        wxid: bot.currentUser.id,
        puppet: {
            name: puppetName,
            type: puppetName.includes("padlocal")
                ? "padlocal"
                : puppetName.includes("wechat4u")
                    ? "wechat4u"
                    : "unknown",
        },
    };
    logger.debug(`bot data: %o`, botData);
    return {
        ...botData,
        data: botData,
        addSendTask,
        notify: async (content, llmScenario, level) => {
            void addSendTask(async () => {
                (await bot.Room.find({ topic: /飞脑通知/i }))?.say(content);
                if (level && level >= LogLevel.error)
                    (await bot.Room.find({ topic: /飞脑报错/i }))?.say(content);
            });
        },
        getHelp: async () => {
            return `
${name} Is an AI Native software, for individual/group intelligent management.
------------------------------
Feats：
  1. Parser: AI Parser for anything
  2. Chatter: AI Chatter knows anything
  3. Todo: Your Personal Task Manager (with Reminder)
  0. System: Preference Relative
------------------------------
Basic Commands：
  status: (show preference)
  help: (show usage)
`;
        },
        getStatus: async (message) => {
            const aliveTime = formatDuration((Date.now() - botData.startTime) / 1e3);
            const convPreference = await getConvPreference({
                convId: message.conversation().id,
            });
            return [
                yaml.dump({ Basic: { name, version, aliveTime } }),
                yaml.dump({ Preference: convPreference }),
            ].join(SEPARATOR_LINE + "\n");
        },
    };
};

/**
 * 展示用户信息，与它的调用量
 *
 * @param message
 * @param type
 */
const formatTalkerFromMessage = async (message, type) => {
    let s = message.talker().name();
    const roomTopic = await message.room()?.topic();
    if (roomTopic) {
        s += `@${roomTopic}`;
    }
    return s;
};

/**
 * 单方面把bot删了后，再添加bot，不会触发 friendship
 *
 * @param bot
 * @param friendship
 */
const handleFriendship = async (bot, friendship) => {
    logger.info(`onFriendship: %o`, friendship);
    if (
    // todo: 这个是用户首次添加bot？ (3)
    friendship.type() === types.Friendship.Verify ||
        // bot把用户删了后，用户再次添加bot (2)
        friendship.type() === types.Friendship.Receive)
        // 如果不接受好友的话，无法接受转账（但红包可以，但红包无法hook）
        await friendship.accept();
    const user = friendship.contact();
    await bot.context?.addSendTask(async () => {
        await user.say(`您好啊！我是好用到哭的 AI 助理「飞脑」！
${SEPARATOR_LINE}
这是我能为您提供的服务：
  - 发送一篇公众号文章，我将为您总结
  - 问我一个问题，我将为您解答
  - 其他定时提醒功能、社群管理功能（待完善）
您也可以把我拉到其他群里，产生的费用您可以自行向群友收取。
${SEPARATOR_LINE}
- BUG 反馈请联系飞脑客服：${config.company["customer-service"].wxid}
- 飞脑十分注重用户隐私，与您的聊天记录不会共享于他人
- 续费请扫码：XXX (新朋友免费赠送100飞币)
- 当前版本：${bot.context?.version}
- 当前时间：${moment().format("YYYY/MM/DD HH:mm")}
`);
    });
};

const featureTypeSchema = z.enum([
    "system",
    "todo",
    "chatter",
    "parser",
    "room",
    "test",
]);
z.enum(["base", ...featureTypeSchema.options]);
const quoteTypeSchema = z.enum(["parse", "recall"]);
const commandsSchema = z.enum([
    "love",
    "ding",
    "status",
    "help",
    ...featureTypeSchema.options,
    ...quoteTypeSchema.options,
]);

const parseLimitedCommand = (text, commands, prefix = "") => {
    const ms = commands instanceof Array ? commands : commands.options.map((o) => o);
    // 正则使用 `` 而非 // 的时候要 \s --> \\s
    // - /A, ok
    // - /A b, ok
    // - /Ab, not ok
    const m = new RegExp(`^${prefix}(${ms.join("|")})(?:\\s+(.*?))?\\s*$`, 
    // m 匹配每一行：https://zh.javascript.info/regexp-multiline-mode
    "sg").exec(text);
    if (!m)
        return null;
    const command = m[1];
    const args = (m[2] ?? "").trim();
    // logger.info({ text, command, args })
    return { command, args };
};

const parseText = (messageText) => {
    const text = (deserializeMsg(messageText, puppetVersion)?.content ?? messageText).trim();
    // logger.debug("parseText: %o", { text, messageText })
    return text;
};

/**
 * 存储信息
 * 并用于后续的读取
 *
 * @param message
 */
const storageMessage = async (message) => {
    const talker = message.talker();
    const room = message.room();
    const listener = message.listener();
    const type = message.type();
    const rawPayload = message.payload;
    // console.log("rawPayload: ", rawPayload)
    const payload = omit(rawPayload, ["talkerId", "roomId", "listenerId"]);
    // we can use `this.bot.Image.create(mid) to create an Image, but with image in the cache (after bot starts)`
    if (type === types.Message.Image)
        payload.text = `<Image id="${payload.id}"/>`;
    try {
        await prisma.wechatMessage.create({
            // todo: augmentation
            data: {
                ...payload,
                talker: {
                    connectOrCreate: {
                        where: {
                            id: talker.id,
                        },
                        create: talker.payload,
                    },
                },
                listener: listener
                    ? {
                        connectOrCreate: {
                            where: {
                                id: listener.id,
                            },
                            create: listener.payload,
                        },
                    }
                    : {},
                room: room
                    ? {
                        connectOrCreate: {
                            where: {
                                id: room.id,
                            },
                            create: room.payload,
                        },
                    }
                    : {},
            },
        });
    }
    catch (e) {
        logger.debug(`skipped message storaging`);
        // formatError(e)
    }
};

const formatFooter = (context) => context ? `${context.name} ${context.version}` : "正在初始化";

/**
 * 可用于微信的回复
 *
 */
const formatQuery = (content, options) => {
    const lines = [];
    if (options?.commandStyle === CommandStyle.standard && options?.title)
        lines.push("  " + options.title);
    lines.push(content);
    if (options?.tips)
        lines.push(["TIPS: ", options.tips].join("\n"));
    if (options?.commandStyle === CommandStyle.standard && options?.footer)
        lines.push("  " + options.footer);
    let s = lines.join(`\n${SEPARATOR_LINE}\n`);
    if (options?.commandStyle === CommandStyle.standard)
        s = [SEPARATOR_BOX, s, SEPARATOR_BOX].join("\n");
    return s;
};

class BasePlugin {
    message;
    bot;
    name = null;
    i18n = {
        zh: {
            title: "飞脑助手",
            description: "",
            commands: {},
        },
        en: {
            title: "SWOT",
            description: "",
            commands: {},
        },
    };
    constructor(bot, message) {
        // todo: bot on message
        this.bot = bot;
        this.message = message;
    }
    get room() {
        return this.message.room();
    }
    get isRoom() {
        return !!this.room;
    }
    get text() {
        return parseText(this.message.text());
    }
    get quote() {
        return deserializeMsg(this.message.text(), puppetVersion);
    }
    get conv() {
        return this.message.conversation();
    }
    get convId() {
        const convId = this.conv.id;
        logger.debug({ convId });
        return convId;
    }
    async getTalkingUser() {
        const sender = this.message.talker();
        const image = this.bot.context?.puppet.type === "padlocal"
            ? sender.payload.avatar
            : await (await sender.avatar()).toDataURL();
        // DataURL formatted image 很长，避免打印 or truncate
        // logger.debug(`fetching talking User(image=${formatString(image, 20)})`)
        // puppet-web有问题，拿不到avatar
        // if (!image) throw new Error("talking user has no avatar")
        return {
            name: sender.name(),
            image: image,
        };
    }
    async getUserIdentity() {
        return `${this.message.talker().id}_${this.room?.id}@wechat`;
    }
    async getLatestMessages(n = 10) {
        const messages = await prisma.wechatMessage.findMany({
            ...wechatMessageDetailSchema,
            where: {
                // 三者任一即可
                OR: [
                    { roomId: this.convId },
                    { listenerId: this.convId, talkerId: this.bot.context?.wxid },
                    { talkerId: this.convId, listenerId: this.bot.context?.wxid },
                ],
            },
            orderBy: {
                createdAt: "asc",
            },
            take: -n,
        });
        logger.debug(messages.map((m) => formatString(JSON.stringify(m), 120)));
        return messages;
    }
    async getQuotedMessage() {
        if (this.quote?.quoted.version === "mark@2024-04-19") {
            const quoted = this.quote?.quoted;
            if ("id" in quoted) {
                const id = quoted.id;
                logger.debug(`quoted message id=${id}`);
                return await this.bot.Message.find({ id });
            }
        }
        return null;
    }
    /**
     * 最好用户 recall 玩之后，用户的消息还可以recall，不过目前还不支持，也许可以recall 多条 类似 recall -n 3 之类
     */
    async recallQuotedMessage() {
        const quotedMessage = await this.getQuotedMessage();
        logger.info(`quoted message: %o`, quotedMessage);
        return quotedMessage?.recall();
    }
    async getRoomTopic() {
        return await this.room?.topic();
    }
    async parse(input) {
        throw new NotImplementedError();
    }
    /**
     * todo: cache preference
     */
    async getConvPreference() {
        return getConvPreference({ convId: this.convId });
    }
    async getConvData() {
        return getConvData({ convId: this.convId });
    }
    async getLang() {
        return (await this.getConvPreference()).display.lang;
    }
    async getData() {
        return this.i18n[await this.getLang()] ?? this.i18n.en;
    }
    async getTitle() {
        return (await this.getData()).title;
    }
    async getDescription() {
        return (await this.getData()).description;
    }
    async getCommands() {
        return (await this.getData()).commands;
    }
    async getStatus(reply = false) {
        const content = await this.bot.context?.getStatus(this.message);
        if (content && reply)
            await this.standardReply(content);
        return content;
    }
    async getHelp(reply = false) {
        const content = await this.bot.context?.getHelp();
        if (content && reply)
            await this.standardReply(content);
        return content;
    }
    async standardReply(content, tips) {
        const preference = await this.getConvPreference();
        // truncate middle lines
        const N = preference.display.maxLines;
        let lines = content.split("\n");
        if (lines.length > N) {
            lines = [
                ...lines.slice(0, N / 2),
                "...",
                ...lines.slice(lines.length - N / 2),
            ];
        }
        content = lines.join("\n");
        const pretty = formatQuery(content, {
            title: await this.getTitle(),
            tips: tips ? tips.map((t) => `  ${t}`).join("\n") : undefined,
            footer: formatFooter(this.bot.context?.data),
            commandStyle: preference.display.style,
        });
        void this.bot.context?.addSendTask(() => this.message.say(pretty));
    }
    async help() {
        const commands = await this.getCommands();
        await this.standardReply((await this.getDescription()) ?? "No Description", Object.keys(commands).length ? Object.keys(commands) : undefined);
    }
    async notify(content, llmScenario, level) {
        void this.bot.context?.notify(content, llmScenario, level);
    }
    async reply(message) {
        await this.bot.context?.addSendTask(async () => {
            const sentMessage = await this.message.say(message);
            logger.debug(`\n-- sentMessage: [%o]`, sentMessage);
            // await storageMessage(message)
        });
    }
    async updatePreferenceInDB(path, value, 
    // if string, reply with the string
    // if boolean, reply with status
    reply = undefined, level = "conv") {
        const updatePreference = (preference) => {
            const convertedValue = evalObject(value);
            logger.info(`updating preference: path=${path}, value=${value}, preference=${JSON.stringify(preference)}`);
            // migrate v1 --> v2
            set(preference, path, convertedValue);
            logger.info(`updated preference: path=${path}, value=${value}, preference=${JSON.stringify(preference)}`);
        };
        const preference = await this.getConvPreference();
        updatePreference(preference);
        await prisma.wechatConv.update({
            where: { id: this.convId },
            data: {
                preference: JSON.stringify(preference),
            },
        });
        if (reply) {
            if (typeof reply === "string") {
                await this.reply(reply);
            }
            if (typeof reply === "boolean") {
                await this.getStatus(true);
            }
        }
    }
}

/**
 * 获取最后一次
 * @param convId
 */
const listMessagesOfLatestTopic = async (botWxid, convId) => {
    const lastUserSetCommand = await prisma.wechatMessage.findFirst({
        where: {
            // todo: 这里是错的， listenerId, talkerId 应该要成对
            // 三者任一即可
            OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
            text: {
                // 不能用 contains 否则会误包含
                startsWith: "/new-topic",
                // todo: /new-topic /set-topic /start-chat
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    // if (!lastUserSetCommand) throw new Error("no lastUserSetCommand")
    const lastUserStartChat = await prisma.wechatMessage.findFirst({
        where: {
            OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
            createdAt: lastUserSetCommand
                ? {
                    gt: lastUserSetCommand.createdAt,
                }
                : undefined,
            talkerId: {
                not: botWxid,
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    // if (!lastUserStartChat) throw new Error("no lastUserStartChat")
    const messages = await prisma.wechatMessage.findMany({
        ...wechatMessageDetailSchema,
        where: {
            // AND, ref: https://chat.openai.com/c/895c1452-c3bd-4d5b-ba9f-c23c7750f412
            AND: [
                // 1. filter conv
                {
                    OR: [
                        { roomId: convId },
                        { listenerId: convId },
                        { talkerId: convId },
                    ],
                },
                // todo: 因为基于任意command，所以这里的筛选没有意义了，之后换meta信息吧
                // 2. filter ai context
                // {
                //   OR: [
                //     // valid bot is cued
                //     {
                //       // bot is cued
                //       OR: [
                //         // in contact
                //         {
                //           listenerId: botWxid,
                //         },
                //
                //         // in room
                //         {
                //           OR: [
                //             {
                //               mentionIdList: {
                //                 has: botWxid,
                //               },
                //             },
                //             {
                //               text: {
                //                 startsWith: "!",
                //               },
                //             },
                //             {
                //               text: {
                //                 startsWith: "！",
                //               },
                //             },
                //           ],
                //         },
                //       ],
                //
                //       // but not command
                //       text: {
                //         not: {
                //           startsWith: "/",
                //         },
                //       },
                //     },
                //     //  valid bot replies
                //     {
                //       // bot replies
                //       talkerId: botWxid,
                //       // but not command
                //       text: {
                //         not: {
                //           startsWith: SEPARATOR_BOX,
                //         },
                //       },
                //     },
                //   ],
                // },
                // 3. filter time
                {
                    createdAt: lastUserStartChat
                        ? {
                            gte: lastUserStartChat.createdAt,
                        }
                        : undefined,
                },
            ],
        },
        orderBy: { createdAt: "asc" },
        // 微信内一般一条文本200字左右，取20条就是4k，比较合适
        // todo: 根据模型同进行控制
        take: -20,
    });
    while (messages.length) {
        // ensure first message is from user
        if (messages[0].talkerId === botWxid)
            messages.splice(0, 1);
        else
            break;
    }
    // logger.info({
    //   lastUserSetCommand,
    //   lastUserStartChat,
    //   messagesLen: messages.length,
    // })
    // logger.info("context: " + formatString(JSON.stringify(messages)))
    return messages;
};

z.enum([
    "enable",
    "disable",
    // "new", "list"
]);
const i18n$4 = {
    en: {
        title: "Super Chatter",
        description: "Hello, I am the Super Chatter!" +
            "\nThe Only One AI Bot You Need in the WeChat ecosystem." +
            "\nWhat I can help you today? 🍺",
        commands: {
            enable: {
                type: "enable",
                description: "enable AI chat",
            },
            disable: {
                type: "disable",
                description: "disable AI chat",
            },
            // new: {
            //   type: "new",
            //   description: "create a new topic",
            // },
            // list: {
            //   type: "list",
            //   description: "list all the topics",
            // },
        },
    },
};
class ChatterPlugin extends BasePlugin {
    static name = "chatter";
    i18n = i18n$4;
    async help() {
        const commands = await this.getCommands();
        const desc = await this.getDescription();
        const preference = await this.getConvPreference();
        await this.standardReply([
            desc,
            SEPARATOR_LINE,
            "Status:",
            `  - enabled: ${preference.features.chatter.enabled}`,
            `  - model: ${preference.features.chatter.model}`,
        ].join("\n"), Object.keys(commands).map((command) => `  ${ChatterPlugin.name} ${command}`));
    }
    async safeReplyWithAI() {
        const m = this.message;
        // todo: @all 的时候有bug
        // const mentionList = await m.mentionList()
        // const mentionIds = mentionList.map((m) => m.id)
        // logger.debug("mention ids: %o", mentionIds)
        if (
        // 过滤非文本 todo: image/xxxx
        m.type() !== types.Message.Text ||
            // 过滤自己的消息
            m.self() ||
            // 过滤微信官方
            m.talker().id === "weixin" ||
            // 过滤群聊中没有at自己的消息 （私信要回）
            (m.room() &&
                // 没有被 at
                (!(await m.mentionSelf()) ||
                    // ignore all
                    this.text.includes("@All")) &&
                // 也没有问号开头
                //   todo: 允许开头有空格，要与后续找信息时对上（重构一下）
                !/^\s*[?？]/.exec(this.text)))
            return;
        const convPreference = await this.getConvPreference();
        if (!convPreference.features.chatter.enabled) {
            const convData = await this.getConvData();
            // todo: user control
            if (!convData.plugin.chatter.turnOnReminded) ;
            return logger.debug(`!convPreference.features.chatter.enabled`);
        }
        // todo: 市面上最牛逼的 AI 群聊回复逻辑
        // 顶层回复逻辑：只回答 上一次bot到本次bot准备回复之间，需要回答的N个问题（同一会话里，且已经有LLM在调用，且目前的消息不是队列的最尾部，则抛弃该LLM）
        // 中层选择1. 每条需要回复的消息，一一进行quote回复
        // 中层选择2. 所有待回复的消息，统一在一次回复里解决，然后不同的消息对象，使用 at 的技术
        // 底层的逻辑（每一个问题怎么回复）:【目的是意图识别的分类函数】
        // 1. 先判断用户的这个问题是否是恶意问题【风控】黑名单违规记录+1，直到3直接封号，并给出友好提示
        // 2. 是否需要进行文件解析【kimi】、文章解析【kimi】、图片理解【kimi/4v】等高消耗的大语言模型任务
        // 3. 组合上下文去回复 【长窗口怎么去handle】
        // 拿取最新的上下文记录
        const filteredMessages = this.bot.context?.wxid
            ? await listMessagesOfLatestTopic(this.bot.context.wxid, this.convId)
            : [];
        const model = convPreference.features.chatter.model;
        const messages = filteredMessages
            .filter((m) => !!m.text)
            .map((m) => ({
            role: m.talkerId === this.bot.context?.wxid
                ? "assistant"
                : "user",
            // todo: merge chats
            content: `[${m.talker.name}]: ${m.text}`,
        }));
        trimMessages(messages, model);
        // logger.info(`--  context(len=${context.length})`)
        void this.notify([`🌈 calling LLM (model=${model})`].join("\n"), "chatter");
        // 送给 LLM
        // todo: 送给 agent
        const res = await safeCallLLM({
            messages,
            model,
            user: await this.getUserIdentity(),
        });
        if (res.error)
            throw new Error(res.error);
        const content = res.response?.choices[0]?.message.content;
        if (!content)
            throw new Error(`invalid response content, please check Query(id=${res.query.id})`);
        void this.reply(content);
        void this.notify([`✅ called LLM`, SEPARATOR_LINE, content].join("\n"), "chatter");
    }
}

// import { PuppetVersion } from "../../wechaty-puppet/src/extra"
/**
 * todo: limited input
 * @param title
 * @param version
 */
const getQuotedMessage = async (id, title, version = "mark@2024-04-19") => {
    const row = await prisma.wechatMessage.findFirstOrThrow({
        where: {
            type: types.Message.Url,
            OR: [
                {
                    text: {
                        contains: title,
                    },
                },
                {
                    id,
                },
            ],
        },
        orderBy: { createdAt: "desc" },
    });
    return row;
};

z.enum([""]);
const i18n$3 = {
    en: {
        title: "Super Parser",
        description: "Hello, I am the Super Parser!" +
            "\nI can parse almost anything!" +
            "\nSend me one wxmp article, now! 😠",
        commands: {},
    },
};
class ParserPlugin extends BasePlugin {
    static name = "parser";
    static uniParser = null;
    static toParse = 0;
    i18n = i18n$3;
    async help() {
        const commands = await this.getCommands();
        const desc = await this.getDescription();
        await this.standardReply(desc, Object.keys(commands).map((command) => `  ${ParserPlugin.name} ${command}`));
    }
    async parseSelf() {
        const message = this.message;
        const rawText = message.text();
        // console.log({ message, rawText })
        const text = await z.string().parseAsync(rawText);
        // console.log({ text })
        return this.safeParseCard({
            message: {
                convId: this.convId,
                roomTopic: await this.getRoomTopic(),
                text,
                id: message.id,
            },
        });
    }
    async parseQuote() {
        if (!this.quote)
            return;
        const v = this.quote.quoted.version;
        const message = await getQuotedMessage(v === "mark@2024-04-19" && "id" in this.quote.quoted
            ? this.quote.quoted.id
            : undefined, this.quote.quoted.content ?? "");
        const text = await z.string().parseAsync(message.text);
        return this.safeParseCard({
            message: {
                convId: this.convId,
                roomTopic: await this.getRoomTopic(),
                text,
                id: message.id,
            },
        });
    }
    async safeParseCard({ message, }) {
        // todo: dynamic sender with fixed card url
        // const user = convertUserSummary(this.talkingUser)
        const user = await this.getTalkingUser();
        if (!user)
            throw new Error("user not prepared");
        const text = parseText(message.text);
        const url = parseUrlFromWechatUrlMessage(text);
        // 仅供测试环境
        // await dumpFile({ text: message.text, url }, `${Date.now()}.json`)
        logger.info(`parser url=${url}`);
        if (!url)
            return;
        if (!isWxmpArticleUrl(url))
            return logger.info(`passed since it's not wxmp article`);
        const convPreference = await this.getConvPreference();
        if (!convPreference.features.parser.enabled)
            return logger.info(`passed since parser disabled`);
        try {
            // initLogWithTimer()
            ++ParserPlugin.toParse;
            const title = parseTitleFromWechatUrlMessage(text);
            void this.notify(`🌈 正在解析[${ParserPlugin.toParse}]: ${title}`, "parser");
            if (!ParserPlugin.uniParser)
                ParserPlugin.uniParser = new CardSimulator();
            // todo: add userIdentity into parser
            const inner = await wxmpUrl2preview(url, convPreference.features.parser.options);
            const { cardUrl } = await ParserPlugin.uniParser.genCard(JSON.stringify(inner), user);
            logger.info(`-- sending file: ${cardUrl}`);
            const file = FileBox.fromUrl(cardUrl);
            void this.reply(file);
            void this.notify(`✅ 解析成功: ${title}`, "parser");
            logger.info("-- sent file");
        }
        catch (e) {
            // extra reply to user
            // void this.reply("解析失败，请再试一次吧！")
            // uni handle in outer
            throw e;
        }
        finally {
            --ParserPlugin.toParse;
        }
    }
}

z.enum([
    "enable-announce",
    "disable-announce",
    "set-announce-n",
]);
const i18n$2 = {
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
class RoomPlugin extends BasePlugin {
    i18n = i18n$2;
}

const commandTypeSchema = z.enum([
    "list-models",
    // "list-langs",
    "set-avatar",
    "set-preference",
    "sync-rooms",
    "sync-contacts",
]);
const i18n$1 = {
    en: {
        title: "Operating System",
        description: "There are some administrative commands",
        commands: {
            "list-models": {
                type: "list-models",
                description: "list supported LLM models",
            },
            // "list-langs": {
            //   type: "list-langs",
            //   description: "list supported languages",
            // },
            "set-avatar": {
                type: "set-avatar",
            },
            "set-preference": {
                type: "set-preference",
            },
            "sync-rooms": {
                type: "sync-rooms",
            },
            "sync-contacts": {
                type: "sync-contacts",
            },
        },
    },
};
class SystemPlugin extends BasePlugin {
    i18n = i18n$1;
    async parse(input) {
        if (!input)
            return this.help();
        const commands = this.i18n[await this.getLang()]?.commands;
        if (!commands)
            return;
        const parsed = parseLimitedCommand(input, z.enum(Object.keys(commands)));
        if (parsed) {
            const commandKeyInInput = parsed.command;
            const commandKeyInEnum = commands[commandKeyInInput]?.type;
            const commandType = await commandTypeSchema.parseAsync(commandKeyInEnum);
            switch (commandType) {
                case "list-models":
                    await this.listModels();
                    break;
                case "set-avatar":
                    const avatarUrl = await z
                        .string()
                        .min(1)
                        .startsWith("http")
                        .parseAsync(parsed.args);
                    console.log({ avatarUrl });
                    await this.bot.currentUser.avatar(FileBox.fromUrl(avatarUrl));
                    console.log("-- done set avatar");
                    break;
                case "set-preference": {
                    const [key, val] = parsed.args.split(/\s*=\s*/);
                    // todo: validate key
                    if (!key || !val)
                        return;
                    await this.updatePreferenceInDB(key, val, "当前会话配置已更新 ~");
                    break;
                }
                case "sync-rooms": {
                    const rooms = await this.bot.Room.findAll();
                    const result = await Promise.all(rooms.map(async (room) => {
                        const data = room.payload;
                        return !data
                            ? undefined
                            : await prisma.wechatConv.upsert({
                                where: { id: data.id },
                                create: data,
                                update: data,
                            });
                    }));
                    await this.reply(`updated: ${result.filter((i) => !!i).length} / ${result.length}`);
                    break;
                }
                case "sync-contacts": {
                    const contacts = await this.bot.Contact.findAll();
                    const result = await Promise.all(contacts.map(async (contact) => {
                        const data = contact.payload;
                        return !data
                            ? undefined
                            : await prisma.wechatConv.upsert({
                                where: { id: data.id },
                                create: data,
                                update: data,
                            });
                    }));
                    await this.reply(`updated: ${result.filter((i) => !!i).length} / ${result.length}`);
                    break;
                }
            }
        }
    }
    async listModels() {
        return this.standardReply([...llmModelTypeSchema.options.map((o, i) => `${i + 1}. ${o}`)].join("\n"));
    }
}

const taskStatusMap = {
    done: "已完成",
    paused: "已暂停",
    pending: "待开始",
    running: "进行中",
    discarded: "已取消",
};
const serializeTaskGroup = (tasks, status, onlyCount = false, showRoom) => {
    const items = sortBy(tasks.filter((t) => t.status === status), 
    // .map((t) => {
    //   if (!t.priority) t.priority = Priority.normal // possible null
    //   return t
    // })
    "priority");
    const ans = [`${taskStatusMap[status]}（数量：${items.length}）`];
    if (!onlyCount) {
        const arr = _(items)
            .groupBy("priority")
            .entries()
            .map(([priority, items]) => [
            `-- P${priority}`,
            ...items.map((t) => {
                const roomName = t.conv?.topic;
                return `${t.index}) ${t.title} ${showRoom && roomName ? `(${roomName})` : ""}`;
            }),
        ])
            // !important
            .value()
            .flat();
        ans.push(...arr);
    }
    return ans;
};
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
class TaskService {
    message;
    constructor(message) {
        this.message = message;
    }
    async list() {
        const tasksInDB = await prisma.task.findMany({
            ...taskDetailSchema,
            orderBy: {
                createdAt: "asc",
            },
            where: this.message.roomId
                ? {
                    conv: {
                        id: this.message.roomId,
                    },
                }
                : {
                    conv: {
                        OR: [
                            {
                                memberIdList: {
                                    has: this.message.talkerId,
                                },
                            },
                            {
                                id: this.message.talkerId,
                            },
                        ],
                    },
                },
        });
        const tasks = tasksInDB.map((t, index) => ({ ...t, index }));
        // todo: bug if turns on
        // console.log("tasks: ", tasks)
        logger.debug("tasks: \n%o", tasks);
        return tasks;
    }
    async format() {
        const tasks = await this.list();
        const showRoom = !this.message.roomId;
        const s = [
            `任务列表（数量：${tasks.length}）`,
            SEPARATOR_LINE,
            ...serializeTaskGroup(tasks, "running", false, showRoom),
            SEPARATOR_LINE,
            ...serializeTaskGroup(tasks, "pending", false, showRoom),
            SEPARATOR_LINE,
            ...serializeTaskGroup(tasks, "paused", false, showRoom),
            SEPARATOR_LINE,
            ...serializeTaskGroup(tasks, "done", true, showRoom),
            SEPARATOR_LINE,
            ...serializeTaskGroup(tasks, "discarded", true, showRoom),
        ].join("\n");
        logger.debug(`list: ${s}`);
        return s;
    }
    async add(title, priority, timer, description, status) {
        const s = await prisma.task.create({
            data: {
                conv: this.message.roomId
                    ? {
                        connectOrCreate: {
                            where: { id: this.message.roomId },
                            create: {
                                id: this.message.roomId,
                            },
                        },
                    }
                    : {
                        connectOrCreate: {
                            where: { id: this.message.talkerId },
                            create: {
                                id: this.message.talkerId,
                            },
                        },
                    },
                title,
                priority,
                // todo: string repr of Job
                // timer: timer.name,
                description,
                status,
            },
        });
        logger.debug(`added: %o`, s);
        return s;
    }
    async update(index, func) {
        const tasks = await this.list();
        const task = tasks[index];
        if (!task)
            return;
        logger.debug(`func: %o`, func);
        logger.debug(`task before: \n%o`, task);
        parseFunction(func).bind(task)();
        logger.debug(`task after: \n%o`, task);
        const s = await prisma.task.update({
            where: { id: task.id },
            data: omit(task, [
                "index",
                // todo: why incompatible
                "timer",
                "conv",
            ]),
        });
        logger.debug("updated: %o", s);
        return s;
    }
}

var Priority;
(function (Priority) {
    Priority[Priority["highest"] = 1] = "highest";
    Priority[Priority["high"] = 3] = "high";
    Priority[Priority["normal"] = 5] = "normal";
    Priority[Priority["low"] = 7] = "low";
    Priority[Priority["lowest"] = 9] = "lowest";
})(Priority || (Priority = {}));
z.enum([
    "list",
    "add",
    "update",
    "set-timer",
    "unset-timer",
]);
const i18n = {
    en: {
        title: "Todo Manager",
        description: "Hello, I am your PERSONAL Todo Manager!" +
            "\nYou can record and manage any todo here." +
            "\nHope I can help you~  😊",
        commands: {
            list: {
                type: "list",
                description: "list todo",
            },
            add: {
                type: "add",
                description: "add a todo with title",
            },
            update: {
                type: "update",
            },
            "set-timer": {
                type: "set-timer",
            },
            "unset-timer": {
                type: "unset-timer",
            },
        },
    },
};
class TaskPlugin extends BasePlugin {
    static name = "todo";
    // todo: global jobs
    static jobs = {};
    i18n = i18n;
    service = new TaskService(this.message.payload);
    sync = async () => this.reply(await this.service.format());
    async help() {
        const commands = await this.getCommands();
        const desc = await this.getDescription();
        await this.standardReply([desc].join("\n"), Object.keys(commands).map((command) => `  ${TaskPlugin.name} ${command}`));
    }
    /**
     * 1. input prefix ==> command type (zh/en --> enum)
     * 2. operate command
     *
     * @param input
     */
    async parse(input) {
        if (!input)
            return this.help();
        const commands = await this.getCommands();
        if (!commands)
            return;
        const parsed = parseCommand(input);
        logger.debug("parsed: %o", parsed);
        switch (parsed._[0]) {
            case "list":
                await this.sync();
                break;
            case "add":
                const title = z
                    .string()
                    .trim()
                    .min(1)
                    .parse(parsed._.slice(1).join(" "));
                await this.service.add(title);
                // todo: better input
                await this.sync();
                break;
            case "update": {
                const index = z.number().int().min(0).parse(parsed._[1]);
                const rest = parsed._.slice(2).join(" ");
                await this.service.update(index, rest);
                await this.sync();
                break;
            }
            case "set-timer": {
                const index = z.number().int().min(0).parse(parsed._[1]);
                const rest = parsed._.slice(2).join(" ");
                await this.setTimer(index, rest);
                await this.sync();
                break;
            }
            case "unset-timer": {
                const index = z.number().int().min(0).parse(parsed._[1]);
                const rest = parsed._.slice(2).join(" ");
                await this.unsetTimer(index, rest);
                await this.sync();
                break;
            }
        }
    }
    async setTimer(index, timer) {
        const tasks = await this.service.list();
        const task = tasks[index];
        if (!task)
            throw new Error("task not exists");
        const conv = task.conv?.ownerId
            ? await this.bot.Room.find({ id: task.conv.id })
            : await this.bot.Contact.find({ id: task.conv?.id });
        if (!conv)
            throw new Error("not found cov");
        let job = TaskPlugin.jobs[task.id];
        if (job)
            job.cancel();
        logger.debug(`setting timer: %o`, { index, timer });
        job = TaskPlugin.jobs[task.id] = scheduleJob(timer, async () => {
            await conv.say([
                "⏰ " + task.title + " 开始啦~",
                SEPARATOR_LINE,
                `${moment().format("MM-DD HH:mm")} (${timer})`,
            ].join("\n"));
        });
        console.log("jobs: ", TaskPlugin.jobs);
        const nextTime = moment(new Date(job.nextInvocation()));
        console.log({ nextTime });
        await prisma.task.update({
            where: { id: task.id },
            data: {
                timer: JSON.stringify({
                    ...parseJsonSafe(task.timer),
                    disabled: !job,
                }),
            },
        });
        await conv.say(job
            ? `设置成功，下一次提醒在：${nextTime.format("MM-DD HH:mm")}`
            : `设置失败，原因：非法输入`);
    }
    /**
     *
     * @param index
     * @param reason todo
     */
    async unsetTimer(index, reason) {
        const tasks = await this.service.list();
        const task = tasks[index];
        if (!task)
            throw new Error("task not exists");
        const job = TaskPlugin.jobs[task.id];
        if (!job)
            throw new Error("task without job");
        job.cancel();
        delete TaskPlugin.jobs[task.id];
        await prisma.task.update({
            where: { id: task.id },
            data: {
                timer: JSON.stringify({
                    ...parseJsonSafe(task.timer),
                    disabled: true,
                }),
            },
        });
        await this.conv.say("√ unset");
    }
}

class TestPlugin extends BasePlugin {
    async run(args) {
        const programme = yargsParser(args);
        if (programme._[0]?.toString().includes("recall-last-one"))
            await this.testRecallLastOne();
        if (programme._[0]?.toString().includes("reply-link"))
            await this.testReplyLink();
        if (programme._[0]?.toString().includes("describe-last-image"))
            await this.testDescribeLastImage();
    }
    async testDescribeLastImage() {
        const messages = await this.getLatestMessages();
        const lastImageInDB = last(messages.filter((m) => m.type === Number(types.Message.Image)));
        if (!lastImageInDB)
            return logger.debug("no lastImageInDB");
        const lastImageInContext = await this.bot.Message.find({
            id: lastImageInDB.id,
        });
        if (!lastImageInContext)
            return logger.debug("no lastImageInContext");
        const image = await lastImageInContext.toFileBox();
        const result = await safeCallLLM({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "描述一下这张图里的内容",
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: await image.toDataURL(),
                            },
                        },
                    ],
                },
            ],
        });
        const content = result.response?.choices[0]?.message.content;
        if (content)
            await this.reply(content);
    }
    async testReplyLink() {
        void this.reply(new this.bot.UrlLink({
            title: "自定义内容 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
            description: "自定义摘要 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
            url: "https://swot.cs-magic.cn",
            thumbnailUrl: "https://avatars.githubusercontent.com/u/33591398?s=80&v=4",
        }));
    }
    async testRecallLastOne() {
        const messages = await this.getLatestMessages();
        const wxid = this.bot.context?.wxid;
        logger.debug({ wxid });
        const lastBotMessageInDB = last(messages.filter((m) => m.talkerId === wxid));
        if (!lastBotMessageInDB)
            return logger.debug("no lastBotMessageInDB");
        const lastBotMessageInContext = await this.bot.Message.find({
            id: lastBotMessageInDB.id,
        });
        if (!lastBotMessageInContext)
            return logger.debug("no lastBotMessageInContext");
        await lastBotMessageInContext.recall();
    }
}

const handleMessage = async (bot, message) => {
    const tmm = {
        base: new BasePlugin(bot, message),
        todo: new TaskPlugin(bot, message),
        chatter: new ChatterPlugin(bot, message),
        parser: new ParserPlugin(bot, message),
        system: new SystemPlugin(bot, message),
        room: new RoomPlugin(bot, message),
        test: new TestPlugin(bot, message),
    };
    const type = message.type();
    const text = message.text();
    logger.info([
        `[onMessage ${types.Message[type]}]: %o`,
        await formatTalkerFromMessage(message),
        SEPARATOR_LINE,
        text,
    ].join("\n"), omit(message.payload, ["text", "type"]));
    await storageMessage(message);
    switch (type) {
        case types.Message.Url:
            await new ParserPlugin(bot, message).parseSelf();
            return;
        case types.Message.Video:
            logger.debug("== Video ==");
            return;
        case types.Message.Image:
            logger.debug("== Image ==");
            return;
        case types.Message.Text: {
            const text = parseText(message.text());
            const result = parseLimitedCommand(text, commandsSchema);
            // logger.debug("parsed command: %o", { text, result })
            if (result) {
                switch (result.command) {
                    case "test":
                        return void tmm.test.run(result.args);
                    case "ding":
                        return void bot.context?.addSendTask(async () => {
                            logger.info(`\n-- sending ding`);
                            const sentMessage = await message.say("dong");
                            // logger.info(`\n-- sent`)
                            logger.info(`\n-- sentMessage: [%o]`, sentMessage);
                        });
                    case "help":
                        return await tmm.base.getHelp(true);
                    case "status":
                        return await tmm.base.getStatus(true);
                    case "recall":
                        return await tmm.base.recallQuotedMessage();
                    case "system":
                        return await tmm.system.parse(result.args);
                    case "todo":
                        return await tmm.todo.parse(result.args);
                    case "chatter":
                        return; // await tmm.chatter.parse(result.args)
                    case "parser":
                        return await tmm.parser.parse(result.args);
                    case "parse":
                        return await tmm.parser.parseQuote();
                    case "room":
                        return; // await tmm.room.parse(result.args)
                    // todo: 树洞
                    case "love":
                        return await message.say("你有什么想和我说的吗？（我是你最乖的树洞，我们之间的对话不会告诉任何人哦）");
                }
            }
            else {
                await new ChatterPlugin(bot, message).safeReplyWithAI();
            }
        }
    }
};

/**
 * 只有在邀请需要确认时才会触发，小群不会触发 room-invite，但在接受后会触发 room-join
 *
 * @param bot
 * @param roomInvitation
 */
const handleRoomInvite = async (bot, roomInvitation) => {
    logger.info(`onRoomInvite`);
    // todo: is the id of roomInvitation is the id of room (being accepted)?
    const roomId = roomInvitation.id;
    logger.info({ roomId });
    const puppetProtocol = bot.context?.puppet.type;
    if (puppetProtocol === "padlocal") {
        logger.debug(`auto-accepting room-invitation`);
        const roomTopic = await roomInvitation.topic();
        logger.debug({ roomTopic });
        // todo: intelligent notify and decide
        await roomInvitation.accept();
        logger.debug(`accepted`);
    }
    else {
        // todo: wechat4u 不支持获取topic，不支持自动同意
        logger.debug(`skipped auto-accepting room-invitation since Protocol(type=${puppetProtocol}) not supports`);
    }
    // 不要在 room-invite 里发起群加入通知，而是在room-join里发，否则小群加入不会触发
    // await sendRoomInMessage(bot, roomId)
};

const sendMessageOnRoomJoin = async (bot, roomId) => {
    const room = await bot.Room.find({ id: roomId });
    if (!room)
        return logger.warn(`not found room(id=${roomId})`);
    void bot.context?.addSendTask(async () => {
        await room.say(`大家好！我是好用到哭的 AI 助理「飞脑」！
${SEPARATOR_LINE}
以下是我能为大家提供的服务：
  - 发送一篇公众号文章，我将为您总结
  - @我 问一个问题，我将为您解答
  - 其他定时提醒功能、社群管理功能（待完善）
期待能成为大家最得力的小助手呀！
${SEPARATOR_LINE}
- BUG 反馈请联系飞脑客服：MAGIC_SOSO
- 飞脑十分注重用户隐私，当前会话内的聊天记录不会共享于他人
- 当前版本：${bot.context?.version}
- 当前时间：${moment().format("YYYY/MM/DD HH:mm")}
`);
    });
};

/**
 * 小群邀请自己也会触发该 hook
 *
 * @param bot
 * @param room
 * @param inviteeList
 * @param inviter
 * @param date
 */
const handleRoomJoin = async (bot, room, inviteeList, inviter, date) => {
    logger.info(`onRoomJoin`);
    const roomInDB = await prisma.wechatConv.findUnique({
        where: { id: room.id },
    });
    if (!roomInDB)
        return;
    const includeSelf = inviteeList.some((invitee) => invitee.id === bot.context?.wxid);
    logger.info(`inviter(id=${inviter.id}, name=${inviter.name()})\ninvitees %o\nhas self: ${includeSelf}`, inviteeList.map((i) => i.payload));
    if (includeSelf) {
        void sendMessageOnRoomJoin(bot, room.id);
    }
    // todo: only padlocal can get roomNotice
    // if (bot.context?.puppet.type === "padlocal") {
    const roomNotice = await room.announce();
    logger.info(`notice: %o`, roomNotice);
    const data = getRobustData(roomInDB);
    data.room.newInvitees.push(...inviteeList.map((i) => i.id));
    const preference = getRobustPreference(roomInDB);
    if (preference.on.roomJoin.sayAnnounce.enabled &&
        data.room.newInvitees.length >= preference.on.roomJoin.sayAnnounce.n) {
        data.room.newInvitees = [];
        // 不能是空字符
        if (roomNotice.trim())
            await room.say(roomNotice);
    }
    await prisma.wechatConv.update({
        where: { id: roomInDB.id },
        data: {
            data: JSON.stringify(data),
        },
    });
    // }
};

const safeHandle = async (bot, p, suffix) => {
    try {
        return await p;
    }
    catch (e) {
        let s = formatError(e);
        if (suffix) {
            s = [s, SEPARATOR_LINE, suffix].join("\n");
        }
        // if we should expose to the user
        // bug (not solved): https://github.com/wechaty/puppet-padlocal/issues/292
        // from wang, 2024-04-13 01:36:14
        if (s.includes("filterValue not found for filterKey: id"))
            s = `对不起，您的平台（例如 win 3.9.9.43）不支持 at 小助手，请更换平台再试`;
        // !WARNING: 这是个 ANY EXCEPTION 机制，有可能导致无限循环，导致封号！！！
        // void botNotify(bot, await formatBotQuery(context, "哎呀出错啦", s))
        void bot.context?.notify(`❌ ${s}`, undefined, LogLevel.error);
    }
};
const handleWechatyBot = (bot) => {
    bot
        //////////////////////////////
        // basic
        //////////////////////////////
        .on("scan", async (qrcode, status, data) => {
        logger.info(`onScan (status=${ScanStatus[status]}, data=${formatString(data ?? "", 20)}), scan the following qrcode or from wechaty official: https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`);
        qrcodeTerminal.generate(qrcode, { small: true });
    })
        .on("login", async (user) => {
        logger.info(`onLogin: %o`, user.payload);
        bot.context = await initBotContext(bot);
        const contacts = await bot.Contact.findAll();
        const contact = contacts[0];
        console.log(`getting contact avatar(id=${contact?.id})`);
        if (!contact)
            return;
        await contact.avatar();
    })
        .on("logout", (user, reason) => {
        logger.info(`-- User logged out: %o, reason: ${reason}`, user.payload);
    })
        .on("error", async (err) => {
        // 只要handle 一次
        formatError(err);
    })
        //////////////////////////////
        // social
        //////////////////////////////
        .on("message", async (message) => {
        await safeHandle(bot, handleMessage(bot, message), `by ${await formatTalkerFromMessage(message)}\n${moment().format("MM/DD hh:mm:ss")}`);
    })
        .on("friendship", async (friendship) => {
        await safeHandle(bot, handleFriendship(bot, friendship));
    })
        .on("room-invite", async (room) => {
        await safeHandle(bot, handleRoomInvite(bot, room));
    })
        .on("room-join", async (...args) => {
        await safeHandle(bot, handleRoomJoin(bot, ...args));
    })
        .on("post", (post) => {
        logger.info(`onPost: %o`, post);
    })
        //////////////////////////////
        // utils
        //////////////////////////////
        .on("puppet", async (puppet) => {
        logger.debug(`onPuppet`);
        // 不要打印它，太长了；也不要存储，因为自循环
        // logger.debug(puppet)
    })
        .on("heartbeat", (data) => {
        // 比较频繁，大概一分钟一次这样子
        // logger.debug(`onHeartbeat: %o`, data)
        logger.debug(".");
    })
        .on("start", () => {
        logger.info(`onStart`);
    })
        .on("ready", () => {
        logger.info(`onReady`);
    })
        .on("dong", (data) => {
        logger.info(`onDong: %o`, data);
    })
        .on("stop", () => {
        logger.info(`onStop`);
    });
};

/**
 * 这是一个 wrapper， 请在其他地方 start
 *
 */
const createWechatyBot = () => {
    // log env to ensure puppet info.
    logEnv("wechaty");
    const name = env.WECHATY_PUPPET_NAME ?? "default";
    logger.info(`-- init bot(name=${name})`);
    const bot = WechatyBuilder.build({
        name, // 加了名字后就可以自动存储了
        puppetOptions: {
            // mark@2024-04-27 08:49:22: for padlocal
            restartOnFailure: false,
        },
    }); // 等会再更新其他扩展的信息
    // todo: is ready ok ?
    handleWechatyBot(bot);
    return bot;
};

void createWechatyBot().start();
