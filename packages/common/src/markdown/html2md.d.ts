/**
 * ref:
 *   npm packages:
 *   - https://www.npmjs.com/package/turndown （支持扩展）
 *   - https://www.npmjs.com/package/html-to-md （貌似不支持扩展，比如不支持自定义图片解析，就很麻烦）
 *
 * @param html
 * @param type
 */
export declare const html2md: (html: string, type?: "node-html-markdown" | "turndown") => string;
