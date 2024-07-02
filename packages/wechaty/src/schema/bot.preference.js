export var CommandStyle;
(function (CommandStyle) {
    CommandStyle["standard"] = "standard";
    // omit title/footer
    CommandStyle["simple"] = "simple";
    // convert to image
    CommandStyle["image"] = "image";
})(CommandStyle || (CommandStyle = {}));
export const defaultWechatPreference = {
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
export const defaultWechatData = {
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
