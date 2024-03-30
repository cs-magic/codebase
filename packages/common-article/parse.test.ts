import { parseSummary } from "./utils"

it("should ", () => {
  const summary = parseSummary({
    response:
      "<title>陶大程被指论文剽窃，Stefano Ermon公开指责</title>\n" +
      "<description>著名学者陶大程被指剽窃Consistency Trajectory Models (CTM)论文，CTM一作Dongjun Kim和其导师Stefano Ermon在社交媒体上公开指责。陶大程方面回应称，他们的工作并非剽窃，已经标明“借鉴自”，并愿意因引用用语不当向CTM作者道歉。</description>\n" +
      "<mindmap>\n" +
      "- 陶大程被指剽窃CTM论文\n" +
      "  - CTM一作Dongjun Kim发现剽窃行为\n" +
      "  - 导师Stefano Ermon公开指责\n" +
      "- 陶大程方面回应\n" +
      "  - 工作并非剽窃，已标明“借鉴自”\n" +
      "  - 愿因引用用语不当向CTM作者道歉\n" +
      "- Stefano Ermon简介\n" +
      "  - 斯坦福大学计算机科学系副教授\n" +
      "  - 多位毕业生供职于OpenAI\n" +
      "- 陶大程简介\n" +
      "  - 曾任京东探索研究院院长\n" +
      "  - 在人工智能领域有重要研究贡献\n" +
      "</mindmap>\n" +
      "<comment>论文剽窃是学术界的重罪，此次事件涉及两位著名学者，引发了广泛关注。陶大程方面的回应显示出他们对剽窃行为的否认，但是否剽窃，需要更深入的调查和公正的裁决。</comment>",
  })
  console.log({ summary })
})
