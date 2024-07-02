export const formatWechatyMessage = (message, n = 120) => {
    const data = {
        ...message.payload,
        text: message.payload?.text ?? "",
    };
    return data;
};
