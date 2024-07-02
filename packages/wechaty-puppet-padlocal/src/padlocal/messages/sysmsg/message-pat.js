export async function parsePatMessagePayload(patXml) {
    return {
        chatUserName: patXml.chatusername,
        fromUserName: patXml.fromusername,
        pattedUserName: patXml.pattedusername,
        template: patXml.template,
    };
}
