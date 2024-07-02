/**
 * todo: re-calculate life
 */
export const initLogWithTimer = (() => {
    // 用闭包内的变量来跟踪是否已经重写console.log
    let isInitialized = false;
    return () => {
        // 如果已经初始化过，直接返回
        if (isInitialized) {
            return;
        }
        // 从这一点开始，标记为已初始化
        isInitialized = true;
        // 存储原始console.log函数
        const originalConsoleLog = console.log;
        // 用于存储上一次日志的时间戳
        let lastLogTime = null;
        const initLogTime = new Date(); // 初始化时间设置为当前时间
        // 重写console.log函数
        console.log = (...messages) => {
            const now = new Date();
            const timestamp = now.toISOString();
            // 计算自上次日志以来的时间差，如果适用
            const life = now.getTime() - initLogTime.getTime();
            const diff = lastLogTime ? now.getTime() - lastLogTime.getTime() : 0;
            // 更新上次日志时间为现在
            lastLogTime = now;
            // 使用时间戳、持续时间和任何消息调用原始console.log函数
            originalConsoleLog(`[life: ${life / 1e3}s, diff: ${diff / 1e3}s]`, 
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            ...messages);
        };
    };
})();
