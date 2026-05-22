import type { PortableTextBlock } from "@portabletext/react";

const PROSE_WPM = 200;
const CODE_TOKENS_PER_MIN = 200;

interface ContentBlock {
  body: PortableTextBlock[];
  code?: string | null;
}

function blocksToPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block._type !== "block") return "";
      const children = (block as { children?: { text?: string }[] }).children ?? [];
      return children.map((c) => c.text ?? "").join("");
    })
    .join(" ")
    .trim();
}

export function calculateReadingTime(content: ContentBlock[]): number {
  let proseWords = 0;
  let codeTokens = 0;

  for (const block of content) {
    const plainText = blocksToPlainText(block.body);
    if (plainText) {
      proseWords += plainText.split(/\s+/).length;
    }

    if (block.code?.trim()) {
      codeTokens += block.code.trim().split(/\s+/).length;
    }
  }

  const minutes = proseWords / PROSE_WPM + codeTokens / CODE_TOKENS_PER_MIN;

  return Math.max(1, Math.ceil(minutes));
}
