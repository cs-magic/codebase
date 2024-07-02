/**
 *  regex of `/ms`: ref:  https://stackoverflow.com/a/66001191/9422455
 * @param input
 */
export const parseSummary = (input) => {
    // console.log("-- parsed summary input: \n", input)
    const parse = (key) => new RegExp(`<${key}>(.*?)</${key}>`, "ms").exec(input ?? "")?.[1];
    return {
        title: parse("title"),
        description: parse("description"),
        mindmap: parse("mindmap"),
        comment: parse("comment"),
        tags: parse("tags")
            ?.split(/[,，]/)
            .map((s) => s.replace(/\s+/g, "")),
    };
};
