"use client"

import { cn } from "@cs-magic/common"
import React, { HTMLAttributes, LegacyRef } from "react"
import Markdown, { ExtraProps } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"

import "katex/dist/katex.min.css" // `rehype-katex` does not import the CSS for you

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
        h1: (props) => {
          // console.log("h1: ", { props })
          return <h1 className={"text-xl font-medium"}>{props.children}</h1>
        },
        p: (props) => {
          return (
            <p
              className={
                cn()
                // "truncate"
              }
            >
              {props.children}
            </p>
          )
        },
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
