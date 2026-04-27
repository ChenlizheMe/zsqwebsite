# 庄舒晴 · 个人网站

游戏策划 / 互动叙事 / VR — 个人作品集 + 博客。
React + Vite + Framer Motion，NASA-Punk / Starfield 风格视觉。

## 内容维护

| 你想改的东西 | 改这个文件 |
|---|---|
| 姓名 / 邮箱 / 微信 / B 站 / 学历 / 个人方向 / 荣誉条目 | `src/siteConfig.ts` |
| 项目（中英文 + 演示视频 bvid） | `src/data/projects.ts` |
| **项目长文详情**（每个项目可选） | `content/projects/<id>.md` |
| **荣誉长文详情**（每个奖项可选） | `content/honors/<slug>.md` |
| **博客文章** | `content/posts/<slug>.md` |
| 文案（导航、按钮、版块说明） | `src/App.tsx` 中 `copy` 块 |
| 视觉（颜色 / 字体 / 动效） | `src/index.css` + `src/components/VectorField.tsx` |

## 路由（hash 路由，GH Pages 安全）

| 路径 | 内容 |
|---|---|
| `#/` | 主页：Hero + 个人方向 + 学历 + 项目列表 + 荣誉列表 |
| `#/work/<id>` | 单个项目详情页 |
| `#/honors/<slug>` | 单个荣誉详情页 |
| `#/blog` | 博客列表（独立页） |
| `#/blog/<slug>` | 单篇博客 |

侧边栏的"项目"和"荣誉"在主页时会平滑滚动到对应板块；在详情页时会先回主页再滚。

## 本地开发

```bash
npm install
npm run dev
```

## 写博客

文章统一放在 `content/posts/`，文件名建议 `YYYY-MM-标题.md`。
顶部加 YAML 头：

```markdown
---
title: 文章标题
date: 2026-04-12
summary: 一两句摘要
tags: [关卡设计, 节奏战斗]
lang: zh
---

正文用 Markdown 写……
```

支持：标题、列表、引用、代码块、表格、加粗 / 斜体、链接。

## 写项目 / 荣誉的长文详情

**项目**：在 `content/projects/<项目 id>.md` 放一份 markdown，例如：

```markdown
---
title: 球状闪电 VR · 设计笔记
---

## 起点

正文……
```

`<项目 id>` 必须与 `src/data/projects.ts` 中该条目的 `id` 完全一致（例如 `ball-lightning`、`dong-dadong`）。

**荣誉**：同理放在 `content/honors/<slug>.md`，`<slug>` 与 `siteConfig.honors` 里那条的 `slug` 一致。

如果某条目没有 markdown 文件，详情页就只显示结构化的字段（period、role、summary、concept、contribution、outcomes 等），**不会报错**——加 markdown 是锦上添花，不写也能用。

## 上线

直接 `git push` 到主分支即可。`.github/workflows/deploy.yml`：

1. 推 `main` / `master` → CI 跑 `npm run build`，
2. 把 `dist/` 推到 `gh-pages` 分支。
3. 仓库 **Settings → Pages → Source** 选 **Deploy from a branch / `gh-pages` / `/`**。

所有 markdown（博客 / 项目 / 荣誉）都通过 Vite 的 `import.meta.glob` 在**构建期**收录——
不需要单独的 workflow 步骤。

如果仓库名不是 `zsqwebsite`，把 `vite.config.ts` 里的 `repoBase` 改成 `/<你的仓库名>/`。

## 视觉与设计语言

- **NASA Punk / Starfield**：1960-70s 阿波罗工程美学。**功能高于风格**、磨损金属、栓接面板。
- **配色**：深钢蓝 / 瓷白米色 / 信号琥珀 / 鏽橙警示 / 仪表青 / 橄榄绿（昼夜两套）。
- **字体**：Exo 2（标题 / 几何）+ Sofia Sans & Noto Sans SC（正文）+ JetBrains Mono（铭牌）。
- **几何**：背景多层 — drifting nebula + 视差星场（鼠标 / 滚动）+ 蓝图栅格 + 仪表弧 + 雷达扫描扇 + 星座连线 + 远端航线。见 `VectorField.tsx`。
- **昼夜切换**：CSS 变量 + 全站 0.85s `transition`，平滑过渡 + 一次金色光晕扫过。
- **侧边栏**：固定左侧 248px（≤920px 切换为顶部条 + 抽屉式弹出）。

## 视频内嵌

视频对应在 `projects.ts` 项目条目的 `bvid` / `videoStartSec`，用 bilibili 官方 `player.html`。
如 iframe 被网络拦截，可点条目下方"在 bilibili 打开"直跳。
