export const parseLimitedCommand = (text, commands, prefix = "") => {
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
