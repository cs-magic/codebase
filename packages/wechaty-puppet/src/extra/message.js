export var AppMessageType;
(function (AppMessageType) {
    AppMessageType[AppMessageType["Text"] = 1] = "Text";
    AppMessageType[AppMessageType["Audio"] = 2] = "Audio";
    AppMessageType[AppMessageType["Img"] = 3] = "Img";
    AppMessageType[AppMessageType["Video"] = 4] = "Video";
    AppMessageType[AppMessageType["Url"] = 5] = "Url";
    AppMessageType[AppMessageType["Attach"] = 6] = "Attach";
    AppMessageType[AppMessageType["Open"] = 7] = "Open";
    AppMessageType[AppMessageType["Emoji"] = 8] = "Emoji";
    AppMessageType[AppMessageType["VoiceRemind"] = 9] = "VoiceRemind";
    AppMessageType[AppMessageType["ScanGood"] = 10] = "ScanGood";
    AppMessageType[AppMessageType["Good"] = 13] = "Good";
    AppMessageType[AppMessageType["Emotion"] = 15] = "Emotion";
    AppMessageType[AppMessageType["CardTicket"] = 16] = "CardTicket";
    AppMessageType[AppMessageType["RealtimeShareLocation"] = 17] = "RealtimeShareLocation";
    AppMessageType[AppMessageType["ChatHistory"] = 19] = "ChatHistory";
    AppMessageType[AppMessageType["MiniProgram"] = 33] = "MiniProgram";
    AppMessageType[AppMessageType["MiniProgramApp"] = 36] = "MiniProgramApp";
    AppMessageType[AppMessageType["GroupNote"] = 53] = "GroupNote";
    AppMessageType[AppMessageType["ReferMsg"] = 57] = "ReferMsg";
    AppMessageType[AppMessageType["Transfers"] = 2000] = "Transfers";
    AppMessageType[AppMessageType["RedEnvelopes"] = 2001] = "RedEnvelopes";
    AppMessageType[AppMessageType["ReaderType"] = 100001] = "ReaderType";
    AppMessageType[AppMessageType["Quote"] = 49] = "Quote";
    // wechat4u
    AppMessageType[AppMessageType["Channels"] = 51] = "Channels";
})(AppMessageType || (AppMessageType = {}));
