export const isTestMessage = async (message) => {
    const room = message.room();
    const roomName = (await room?.topic()) ?? "";
    return /test|🤔 P01 prompt 工程师/.exec(roomName);
};
