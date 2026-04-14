const PROSE_WPM = 200;
const CODE_TOKENS_PER_MIN = 200;

interface ContentBlock {
  text: string;
  code?: string | null;
}

export function calculateReadingTime(content: ContentBlock[]): number {
  let proseWords = 0;
  let codeTokens = 0;

  for (const block of content) {
    if (block.text.trim()) {
      proseWords += block.text.trim().split(/\s+/).length;
    }

    if (block.code?.trim()) {
      codeTokens += block.code.trim().split(/\s+/).length;
    }
  }

  const minutes = proseWords / PROSE_WPM + codeTokens / CODE_TOKENS_PER_MIN;

  return Math.max(1, Math.ceil(minutes));
}
