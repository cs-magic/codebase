export const compressMd = (content: string): string => {
  return content
    .split("\n")
    .filter((s) => /\S/.test(s))
    .map((s) => s.replaceAll(/!?\[(.*?)]\(.*?\)/g, `<img title="$1"/>`))
    .join("\n")
}
