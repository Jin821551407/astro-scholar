---
layout: '../../layouts/BlogPost.astro'
title: '用 Astro 部署个人博客到 GitHub Pages'
date: '2026-03-15'
description: '从 base 路径、.nojekyll 到 gh-pages 分支，总结 Astro 静态站点部署 GitHub Pages 的完整流程与常见坑。'
tags: ['Astro', '部署', 'GitHub Pages']
---

把 Astro 博客部署到 GitHub Pages，看起来只需 `npm run build` 然后推送 `dist`，实际踩坑往往出在路径与 Jekyll 规则上。

## 关键配置

在 `astro.config.mjs` 中，项目站（如 `username.github.io/repo-name`）需要正确设置：

```js
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/repo-name/',
});
```

- `site` 只写域名，不带子路径
- `base` 与仓库名一致

## .nojekyll 不能少

GitHub Pages 默认启用 Jekyll，会**忽略以下划线开头的目录**。Astro 构建产物在 `_astro/` 下，缺少 `.nojekyll` 会导致 CSS 和图片全部 404。

在 `public/.nojekyll` 放置空文件，构建时会复制到 `dist/`。若用 `gh-pages` 包部署，记得加 `--dotfiles` 参数。

## 本地预览

不要用 Live Server 直接打开 `dist/index.html`。应使用：

```bash
npm run build
npm run preview
```

访问带 `/repo-name/` 前缀的地址，才能正确加载静态资源。

## 部署命令

```bash
npm run deploy
# 等价于 astro build && npx gh-pages -d dist -b gh-pages --dotfiles
```

推送完成后等待 1–3 分钟，访问 `https://username.github.io/repo-name/` 验证 `_astro` 资源是否可加载。

## 小结

| 问题 | 原因 | 解决 |
|------|------|------|
| CSS 404 | Jekyll 忽略 `_astro` | 添加 `.nojekyll` |
| 路径错误 | `base` 与仓库名不一致 | 检查 `astro.config.mjs` |
| Live Server 404 | 服务器根目录不对 | 使用 `astro preview` |

部署成功后，就可以专注写博客内容了——当然，改配置花掉的时间也算「内容」的一部分。
