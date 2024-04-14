import { isWxmpArticleUrl } from "@cs-magic/p01-card/src/core/card-platform/wechat-article/utils";
import { CardSimulator } from "@cs-magic/p01-card/src/core/card-simulator";
import { FileBox } from "file-box";
import { types } from "wechaty";
import { fetchWxmpArticleWithCache } from "../../../3rd-wechat/wxmp-article/fetch-wxmp-article-with-cache";
import { initLog } from "../../../common-common/init-log";
import { parseUrlFromWechatUrlMessage } from "../../../common-common/parse-url-from-wechat-url-message";
import { getConvTable } from "../../utils/get-conv-table";
import { getConvPreference } from "../../utils/get-conv-preference";
import { BaseManager } from "./base.manager";

export class ParserManager extends BaseManager {
  private uniParser: CardSimulator | null = null;

  async enableParser() {
    await getConvTable(this.message).update({
      where: { id: this.convId },
      data: {
        preference: {
          parserEnabled: true,
        },
      },
    });
    await this.standardReply(
      `万能解析器已启动，请发送一篇公众号文章让我解析吧！`,
      ["disable-parser"],
    );
  }

  async disableParser() {
    await getConvTable(this.message).update({
      where: { id: this.convId },
      data: {
        preference: {
          parserEnabled: false,
        },
      },
    });
    await this.standardReply(`已关闭，期待您下次再打开`, ["enable-parser"]);
  }

  async safeParseCard() {
    const message = this.message;

    if (message.type() !== types.Message.Url) return;

    const url = parseUrlFromWechatUrlMessage(message.text());
    console.log("-- url in message: ", url);
    if (!url) return;

    if (!isWxmpArticleUrl(url)) return;

    const preference = await getConvPreference(message);
    if (!preference.parserEnabled) return;

    initLog();

    await message.say("正在解析……");

    const card = await fetchWxmpArticleWithCache(url, {
      backendEngineType: preference.backend,
      summaryModel: preference.model,
    });
    // todo: dynamic sender with fixed card url
    // let cardUrl = card.ossUrl
    const sender = message.talker();

    // avatar 在 padLocal 下是带domain的；web下不稳定
    const image = sender.payload?.avatar;
    const user = image
      ? {
          id: sender.id,
          name: sender.name(),
          image,
        }
      : undefined;

    console.log(`-- parsing content`);
    if (!this.uniParser) this.uniParser = new CardSimulator();

    const cardContent = JSON.stringify(card);
    console.log(cardContent);
    const { cardUrl } = await this.uniParser.genCard(cardContent, user);

    console.log(`-- sending file: ${cardUrl}`);

    await message.say(FileBox.fromUrl(cardUrl));
    console.log("-- ✅ sent file");
  }
}
