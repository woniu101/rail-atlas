# 部署与维护

## GitHub Pages

仓库：https://github.com/woniu101/rail-atlas

网站：https://woniu101.github.io/rail-atlas/

仓库Settings → Pages的Source使用GitHub Actions。`.github/workflows/deploy.yml`在推送main或手动触发时运行，固定Node.js 24和pnpm锁文件。构建工作读取代码；部署工作仅使用Pages和OIDC发布权限，不需要手动保存部署Token。

流程：安装锁定依赖 → 类型检查 → Astro与Pagefind构建 → 测试 → 上传dist → 发布。PR仅构建检查。失败时打开Actions查看对应步骤，修复后推送；也可对一次失败运行选择Re-run jobs。

项目Pages位于 `/rail-atlas/`。工作流设置 `SITE_BASE=/rail-atlas`、`SITE_URL=https://woniu101.github.io`。站内URL、模型加载器、字体与搜索结果使用同一前缀，不要直接在组件中写死根路径资源。

可用PowerShell在本地复现构建：

```powershell
$env:SITE_BASE = '/rail-atlas'
$env:SITE_URL = 'https://woniu101.github.io'
npm run build
npm test
# 完成后恢复普通本地开发
Remove-Item Env:SITE_BASE
Remove-Item Env:SITE_URL
```

## 阿里云Nginx或其他静态托管

根域名部署时设置实际 `SITE_URL`，`SITE_BASE=/`或留空；子目录部署则使用实际路径。重新执行 `npm run build`，将整个dist复制至Web根目录。保留目录结构，Nginx使用 `try_files $uri $uri/ =404;`。项目不需要Node.js常驻服务、数据库或后端API。

全站使用真实静态路由，不配置SPA统一回退。大文件应正确返回GLB；不要让不存在的模型请求返回首页HTML。可为字体、图片、模型和带哈希脚本启用合适的缓存。

## 迁移与备份

Git包含运行所需的压缩模型，但不含Downloads、原始GLB或重复备份。完整迁移时另行复制 `assets/source-models/` 和 `model-backups/`，保留来源与SHA-256。不要上传环境文件、Token或个人账号数据。

## 官方参考

- [Astro部署到GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages使用限制](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Pagefind子目录配置](https://pagefind.app/docs/search-config/)
