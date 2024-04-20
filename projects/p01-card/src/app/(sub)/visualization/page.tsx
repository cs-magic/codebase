import MarkMap from "../../../../../../common/visualization/markmap";

export default function VisualizationPage() {
  const content =
    "**CTM剽窃事件概述**\n" +
    "\n" +
    "- **事件起因**\n" +
    "  - Dongjun Kim指控其CTM论文被剽窃，发表在arxiv上。\n" +
    "  - 指控包括轨迹一致性idea和证明过程的逐字剽窃。\n" +
    "  - 发现6例未引用的改写剽窃和3例逐字剽窃。\n" +
    "\n" +
    "- **双方立场**\n" +
    "  - **CTM作者**：要求正确引用，对话未解决问题。\n" +
    "  - **被指控作者**：声称已与CTM作者交流，愿意公开邮件链。\n" +
    "  - 被指控作者表示没有剽窃行为，标明了“借鉴自”，并愿意正式道歉。\n" +
    "\n" +
    "- **涉及人物**\n" +
    "  - **Stefano Ermon**：CTM论文导师，著名学者，已证实剽窃事件。\n" +
    "  - **陶大程**：被指剽窃论文的共同一作，华人著名学者。\n" +
    "\n" +
    "- **后续影响**\n" +
    "  - 事件引发了学术界和社交媒体的广泛关注。\n" +
    "  - 涉及两位著名学者阵营的对峙，引人深思。";
  return <MarkMap content={content} />;
}
