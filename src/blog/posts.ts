import { parsePost, renderMarkdown } from "./markdown";

/**
 * 在构建时把 content/posts 下的所有 .md 文件作为字符串收录。
 * 新增/修改文章 → push 到主分支 → GitHub Actions 自动重新构建并发布。
 */
const rawPosts = import.meta.glob("/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type PostMeta = {
  /** 文件名派生，用于 URL：/#/blog/<slug> */
  slug: string;
  /** 文章标题 */
  title: string;
  /** ISO 日期，例如 2026-04-15 */
  date: string;
  /** 摘要，一两句话 */
  summary: string;
  /** 标签 */
  tags: string[];
  /** 语言：'zh' | 'en' | 'both'；用于双语过滤（可选） */
  lang?: string;
};

export type Post = PostMeta & {
  /** 已渲染好的 HTML */
  html: string;
  /** 阅读时间，分钟 */
  readMinutes: number;
};

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.md$/, "");
}

function readingMinutes(text: string): number {
  const cnChars = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const enWords = text
    .replace(/[\u4e00-\u9fa5]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(cnChars / 500 + enWords / 200));
  return minutes;
}

const all: Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const { meta, body } = parsePost(raw);
    const slug = (meta.slug as string | undefined) ?? slugFromPath(path);
    const title = (meta.title as string | undefined) ?? slug;
    const date = (meta.date as string | undefined) ?? "1970-01-01";
    const summary = (meta.summary as string | undefined) ?? "";
    const tags = Array.isArray(meta.tags) ? (meta.tags as string[]) : [];
    const lang = (meta.lang as string | undefined) ?? "zh";

    return {
      slug,
      title,
      date,
      summary,
      tags,
      lang,
      html: renderMarkdown(body),
      readMinutes: readingMinutes(body),
    } satisfies Post;
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const posts: Post[] = all;

export function findPost(slug: string): Post | undefined {
  return all.find((p) => p.slug === slug);
}
