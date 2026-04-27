# 庄舒晴 · 个人网站（React + Vite）

- 作品与策划文案：`src/data/projects.ts`（有对应 B 站演示稿时在该项目下填写 `bvid`，无则不要加；**不要**为未建档的项目单挂视频）
- 姓名、学校、邮箱、英文眉题：`src/siteConfig.ts`

## 本地运行

```bash
npm install
npm run dev
```

## 部署到 GitHub Pages（gh-pages 分支）

构建已通过 **推送到 `gh-pages` 分支** 发布，避免「GitHub Actions 一键部署」在未完成仓库 Pages 配置时出现 **deploy-pages 404**。

1. 推送代码到 `main` / `master`，工作流会构建并把 `dist` 推到 **`gh-pages` 分支**。
2. 打开仓库 **Settings → Pages**。
3. **Build and deployment** 里 **Source** 选 **Deploy from a branch**。
4. **Branch** 选 **`gh-pages`**，目录选 **`/ (root)`**，保存。

几分钟后站点生效：`https://<用户名>.github.io/<仓库名>/`

若仓库名不是 `zsqwebsite`，请修改 `vite.config.ts` 中的 `repoBase` 为 `/<你的仓库名>/`。

### 若仍使用官方 `deploy-pages` / OIDC 方案

需先在 **Settings → Pages** 将 Source 设为 **GitHub Actions** 并完成一次启用；否则会提示与日志中类似的 Not Found。当前仓库默认改为 **gh-pages 分支** 发布，一般无需再配置该项。

## 内嵌说明

视频与项目一一对应，写在 `projects` 里对应条目的 `bvid` / `videoStartSec`。播放器为 bilibili 官方 `player.html`；若 iframe 被拦截，可使用条目内「在 bilibili 打开」。
