import { IXiaoHongShuNotePageData } from "./schema";
/**
 * approach 1 (via server json):
 *
 * approach 2 (via meta parse):
 *   const root = parse(data)
 *
 *   const description = root
 *     .querySelector('meta[name="description"]')
 *     ?.getAttribute("content")
 *
 *   const title = root
 *     .querySelector('meta[name="og:title"]')
 *     ?.getAttribute("content")
 *     ?.replace(" - 小红书", "")
 *
 *   const images = root
 *     .querySelectorAll('meta[name="og:image"]')
 *     .map((r) => r.getAttribute("content")!)
 *
 *   const video = root
 *     .querySelector('meta[name="og:video"]')
 *     ?.getAttribute("content")
 *
 * @param url
 */
export declare const fetchXiaoHongShuDetail: (url: string) => Promise<IXiaoHongShuNotePageData | null>;
