import { parsePost, renderMarkdown } from "../blog/markdown";

/**
 * 项目 / 荣誉的可选「长文详情」加载器：
 * - 项目放在 content/projects/<id>.md
 * - 荣誉放在 content/honors/<slug>.md
 * - 文件不存在则返回 null（站点上不显示「查看详情」入口）
 */

const projectDetails = import.meta.glob("/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const honorDetails = import.meta.glob("/content/honors/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type Detail = {
  /** 渲染好的 HTML */
  html: string;
  /** 顶部小字（中文） */
  title?: string;
  /** 阅读时间，分钟 */
  readMinutes: number;
};

function readingMinutes(text: string): number {
  const cnChars = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const enWords = text
    .replace(/[\u4e00-\u9fa5]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(cnChars / 500 + enWords / 200));
}

function loadFrom(map: Record<string, string>, slug: string): Detail | null {
  const key = Object.keys(map).find((p) => p.endsWith(`/${slug}.md`));
  if (!key) return null;
  const raw = map[key];
  const { meta, body } = parsePost(raw);
  return {
    html: renderMarkdown(body),
    title: typeof meta.title === "string" ? meta.title : undefined,
    readMinutes: readingMinutes(body),
  };
}

export function loadProjectDetail(id: string): Detail | null {
  return loadFrom(projectDetails, id);
}

export function hasProjectDetail(id: string): boolean {
  return Object.keys(projectDetails).some((p) => p.endsWith(`/${id}.md`));
}

export function loadHonorDetail(slug: string): Detail | null {
  return loadFrom(honorDetails, slug);
}

export function hasHonorDetail(slug: string): boolean {
  return Object.keys(honorDetails).some((p) => p.endsWith(`/${slug}.md`));
}
