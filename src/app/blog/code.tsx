"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// ─── Language metadata ────────────────────────────────────────────────────────

const LANG_META: Record<string, { label: string; color: string }> = {
  javascript: { label: "JavaScript", color: "#f7df1e" },
  jsx: { label: "JSX", color: "#f7df1e" },
  typescript: { label: "TypeScript", color: "#3178c6" },
  tsx: { label: "TSX", color: "#3178c6" },
  python: { label: "Python", color: "#3572a5" },
  bash: { label: "Bash", color: "#02c096" },
  shell: { label: "Shell", color: "#02c096" },
  sh: { label: "Shell", color: "#02c096" },
  css: { label: "CSS", color: "#7e5bef" },
  scss: { label: "SCSS", color: "#c6538c" },
  html: { label: "HTML", color: "#e34f26" },
  json: { label: "JSON", color: "#939496" },
  sql: { label: "SQL", color: "#7e5bef" },
  rust: { label: "Rust", color: "#dea584" },
  go: { label: "Go", color: "#00add8" },
  yaml: { label: "YAML", color: "#cb171e" },
  markdown: { label: "Markdown", color: "#939496" },
  none: { label: "Code", color: "#939496" },
};

function getLangMeta(lang: string) {
  return (
    LANG_META[lang.toLowerCase()] ?? {
      label: lang.toUpperCase(),
      color: "#939496",
    }
  );
}

// ─── Theme override — keep vscDarkPlus tokens but match portfolio background ──

const portfolioTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "#161616",
    margin: 0,
    padding: "1.25rem 1rem",
    borderRadius: 0,
    fontSize: "0.8125rem", // 13px — standard for code
    lineHeight: "1.75",
    overflowX: "auto",
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: "transparent",
    fontSize: "0.8125rem",
    fontFamily: "var(--font-mono), 'Fira Code', Consolas, monospace",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: Props) {
  const [copied, setCopied] = useState(false);
  const meta = getLangMeta(language || "none");

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="w-full rounded-md overflow-hidden border border-border-color mb-16">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a1a] border-b border-border-color">
        <div className="flex items-center gap-2.5">
          {/* macOS-style dots */}
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          {/* Language label */}
          <span className="ml-3 text-xs font-mono flex items-center gap-1.5 text-gray">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: meta.color }}
            />
            {meta.label}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 text-xs text-gray hover:text-white transition-colors duration-200"
        >
          {copied ? (
            <>
              <Check size={13} className="text-green" />
              <span className="text-green">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language || "text"}
        style={portfolioTheme as any}
        PreTag="div"
        showLineNumbers
        wrapLines={false}
        wrapLongLines={false}
        lineNumberStyle={{
          color: "#444",
          minWidth: "2.5em",
          paddingRight: "1.5em",
          userSelect: "none",
          fontSize: "0.75rem",
        }}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          width: "100%",
          scrollbarWidth: "thin",
          scrollbarColor: "#252627 #161616",
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-mono), 'Fira Code', Consolas, monospace",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
