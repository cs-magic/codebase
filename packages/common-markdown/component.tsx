"use client"

import { HTMLAttributes, LegacyRef } from "react"
import Markdown, { ExtraProps } from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import "katex/dist/katex.min.css" // `rehype-katex` does not import the CSS for you
import { dark, darcula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "../common-ui/shadcn/utils"

export const MarkdownComp = ({
  children,
  fallbackCode,
  className,
  ...props
}: {
  children: string
  fallbackCode?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Markdown
      {...props}
      className={cn("", className)}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code(props: JSX.IntrinsicElements["code"] & ExtraProps) {
          const { children, className, node, ref, ...rest } = props
          const match = /language-(\w+)/.exec(className ?? "")
          const language = match ? match[1] : undefined
          const inline = node?.position?.start.line === node?.position?.end.line
          console.log("code: ", { props, language, inline })

          if (inline) {
            return (
              <code {...rest} ref={ref} className={className}>
                {children}
              </code>
            )
          }

          return (
            <SyntaxHighlighter
              ref={ref as LegacyRef<SyntaxHighlighter>}
              {...rest}
              PreTag="div"
              language={language}
              style={darcula}
              className={"w-full"}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          )
        },
      }}
    >
      {children}
    </Markdown>
  )
}
