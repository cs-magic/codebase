import { HTMLAttributes, LegacyRef } from "react"
import Markdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import "katex/dist/katex.min.css" // `rehype-katex` does not import the CSS for you
import { dark, darcula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "../common-ui/shadcn/utils"

export const MarkdownComp = ({
  children,
  className,
  ...props
}: { children: string } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Markdown
      {...props}
      className={cn(className)}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code(props) {
          const { children, className, node, ref, ...rest } = props
          const match = /language-(\w+)/.exec(className ?? "")
          return match ? (
            <SyntaxHighlighter
              ref={ref as LegacyRef<SyntaxHighlighter>}
              {...rest}
              PreTag="div"
              language={match[1]}
              style={darcula}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} ref={ref} className={className}>
              {children}
            </code>
          )
        },
      }}
    >
      {children}
    </Markdown>
  )
}
