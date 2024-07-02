export const formatString = (s, maxLength) => {
    maxLength = maxLength === undefined ? s.length : Math.min(s.length, maxLength);
    if (s.length <= maxLength)
        return s;
    const n = maxLength / 2;
    return s.slice(0, n) + "..." + s.slice(s.length - n);
};
export const formatLine = formatString;
