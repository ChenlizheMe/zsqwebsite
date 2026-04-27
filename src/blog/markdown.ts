import { marked } from "marked";

/**
 * Lightweight YAML-ish front matter parser for one-line `key: value`.
 * Supports quoted strings and `tags: [a, b]` style arrays.
 */
function parseFrontMatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const match = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/.exec(raw);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, unknown> = {};
  const lines = match[1].split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let value: string = trimmed.slice(colonIdx + 1).trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    value = value.replace(/^["']|["']$/g, "");
    meta[key] = value;
  }

  return { meta, body: match[2] };
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function parsePost(raw: string) {
  return parseFrontMatter(raw);
}

export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false }) as string;
}
