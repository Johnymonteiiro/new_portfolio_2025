"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: Props) {
  return (
    <div className="rounded-lg overflow-hidden mb-16">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        PreTag="div"
        showLineNumbers={true}
        wrapLongLines={true}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
