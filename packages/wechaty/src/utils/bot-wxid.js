export const getBotWxid = (user) => {
    // update bot wxid
    const botWxid = user.payload?.id;
    if (!botWxid)
        throw new Error(`no wxid from user payload: ${JSON.stringify(user.payload)}`);
    return botWxid;
};
