// @ts-ignore
export const singleChatParser = async (padLocalMessage, ret, context) => {
    if (!context.isRoomMessage) {
        ret.talkerId = padLocalMessage.fromusername;
        ret.listenerId = padLocalMessage.tousername;
    }
    return ret;
};
