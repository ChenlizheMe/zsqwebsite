# 庄舒晴 · 个人网站（React + Vite）

项目与文案可在 `src/data/projects.ts` 中编辑；姓名、学校与邮箱在 `src/siteConfig.ts`。

## 本地运行

```bash
npm install
npm run dev
```

## 部署到 GitHub Pages

1. 新建仓库并推送代码。
2. **Settings → Pages → Source** 选择 **GitHub Actions**。
3. 若仓库名不是 `zsqwebsite`，请修改 `vite.config.ts` 中的 `repoBase`。
4. 在 `src/siteConfig.ts` 中填写你的邮箱等联系方式。
5. 推送至 `main` 或 `master` 触发构建。

访问地址示例：`https://<用户名>.github.io/<仓库名>/`

本地开发使用根路径 `/`；CI 构建使用子路径，与 GitHub Project Pages 一致。
