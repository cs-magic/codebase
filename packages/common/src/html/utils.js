export const parseMetaFromHtml = (html, property, key = "property") => {
    return (html.querySelector(`meta[${key}="${property}"]`)?.getAttribute("content") ??
        null);
};
