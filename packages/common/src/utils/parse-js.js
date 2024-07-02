export const parseJs = (s) => {
    try {
        return eval(`(${s})`);
    }
    catch (e) {
        // console.error(`failed to parse js from: ${s}`)
        return null;
    }
};
export const jsParse = parseJs;
