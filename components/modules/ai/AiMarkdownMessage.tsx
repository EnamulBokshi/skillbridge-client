"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type AiMarkdownMessageProps = {
  content: string;
  className?: string;
};

export default function AiMarkdownMessage({ content, className }: AiMarkdownMessageProps) {
  return (
    <div className={cn("space-y-3 wrap-break-word", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        p: ({ children }) => <p className="leading-relaxed">{children}</p>,
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-4"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className="ml-5 list-disc space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="ml-5 list-decimal space-y-1">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="border-b border-border">{children}</thead>,
        th: ({ children }) => (
          <th className="px-3 py-2 text-left font-semibold align-top">{children}</th>
        ),
        td: ({ children }) => <td className="border-t border-border px-3 py-2 align-top">{children}</td>,
        pre: ({ children }) => (
          <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs leading-relaxed">
            {children}
          </pre>
        ),
        code: ({ className, children }) => {
          const isBlockCode = Boolean(className);
          return isBlockCode ? (
            <code className="font-mono">{children}</code>
          ) : (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">{children}</code>
          );
        },
        h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>,
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
