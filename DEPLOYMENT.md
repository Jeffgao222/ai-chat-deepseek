# AI Chat DeepSeek - 部署指南

本文档提供详细的部署说明，帮助您将 AI Chat DeepSeek 应用部署到各种平台。

## 目录

1. [本地开发](#本地开发)
2. [生产构建](#生产构建)
3. [部署到 Vercel](#部署到-vercel)
4. [部署到 Netlify](#部署到-netlify)
5. [部署到 GitHub Pages](#部署到-github-pages)
6. [部署到自己的服务器](#部署到自己的服务器)
7. [常见问题](#常见问题)

## 本地开发

### 前置要求

- Node.js 16+ 和 npm/pnpm
- DeepSeek API Key

### 安装步骤

```bash
# 1. 克隆或下载项目
cd ai_chat_deepseek

# 2. 安装依赖
npm install
# 或使用 pnpm
pnpm install

# 3. 启动开发服务器
npm run dev
# 或
pnpm dev

# 4. 在浏览器中打开
# http://localhost:5173
```

## 生产构建

### 构建应用

```bash
# 构建生产版本
npm run build
# 或
pnpm build

# 预览构建结果
npm run preview
# 或
pnpm preview
```

构建输出将在 `dist` 目录中。

## 部署到 Vercel

Vercel 是部署 Vite + React 应用的最简单方式。

### 方法 1：使用 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署应用
vercel
```

### 方法 2：连接 GitHub

1. 将项目推送到 GitHub
2. 访问 [Vercel 官网](https://vercel.com)
3. 点击 "Import Project"
4. 选择您的 GitHub 仓库
5. 配置设置：
   - **Framework Preset**: 选择 "Vite"
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. 点击 "Deploy"

部署完成后，您将获得一个 `.vercel.app` 域名。

## 部署到 Netlify

### 方法 1：使用 Netlify CLI

```bash
# 1. 安装 Netlify CLI
npm i -g netlify-cli

# 2. 登录 Netlify
netlify login

# 3. 部署应用
netlify deploy --prod --dir=dist
```

### 方法 2：连接 GitHub

1. 将项目推送到 GitHub
2. 访问 [Netlify 官网](https://netlify.com)
3. 点击 "New site from Git"
4. 选择您的 GitHub 仓库
5. 配置设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. 点击 "Deploy site"

## 部署到 GitHub Pages

### 配置步骤

1. 编辑 `vite.config.js`，添加 `base` 配置：

```javascript
export default defineConfig({
  base: '/ai_chat_deepseek/', // 替换为您的仓库名称
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0'
  }
})
```

2. 构建应用：

```bash
npm run build
```

3. 部署到 GitHub Pages：

```bash
# 使用 gh-pages 包
npm install --save-dev gh-pages

# 在 package.json 中添加脚本
"deploy": "npm run build && gh-pages -d dist"

# 运行部署命令
npm run deploy
```

4. 在 GitHub 仓库设置中，将 GitHub Pages 源设置为 `gh-pages` 分支。

## 部署到自己的服务器

### 前置要求

- 一台服务器（Linux/Ubuntu）
- Nginx 或 Apache
- SSH 访问权限

### 部署步骤

#### 1. 本地构建

```bash
npm run build
```

#### 2. 上传文件到服务器

```bash
# 使用 SCP 上传 dist 目录
scp -r dist/ user@your-server:/var/www/ai-chat/

# 或使用 rsync
rsync -avz dist/ user@your-server:/var/www/ai-chat/
```

#### 3. 配置 Nginx

创建 `/etc/nginx/sites-available/ai-chat` 配置文件：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/ai-chat;
    index index.html;

    # 支持 SPA 路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 不缓存 HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

#### 4. 启用配置并重启 Nginx

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/ai-chat /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

#### 5. 配置 HTTPS（推荐）

使用 Let's Encrypt 和 Certbot：

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo systemctl enable certbot.timer
```

## 常见问题

### Q: 应用无法加载，显示空白页面

**A:** 检查以下几点：
1. 浏览器控制台是否有错误信息
2. 网络请求是否正常
3. 检查 `base` 配置是否正确（特别是 GitHub Pages）
4. 清除浏览器缓存

### Q: API 请求失败

**A:** 可能的原因：
1. API Key 无效或过期
2. DeepSeek 服务不可用
3. 网络连接问题
4. CORS 限制（如果从不同域名调用）

### Q: 部署后样式不显示

**A:** 检查以下几点：
1. TailwindCSS 构建是否完成
2. CSS 文件是否被正确加载
3. 检查浏览器开发者工具的 Network 标签

### Q: 如何更新已部署的应用

**A:** 根据您的部署方式：
- **Vercel/Netlify**: 推送到 GitHub 后会自动部署
- **自己的服务器**: 重新构建并上传 `dist` 目录

### Q: 如何自定义域名

**A:** 根据您的部署方式：
- **Vercel**: 在项目设置中添加自定义域名
- **Netlify**: 在站点设置中配置自定义域名
- **自己的服务器**: 在 DNS 提供商中配置 A 记录指向您的服务器 IP

## 性能优化建议

1. **启用 Gzip 压缩**：在 Nginx 中启用 gzip
2. **使用 CDN**：将静态资源部署到 CDN
3. **代码分割**：使用动态导入优化包大小
4. **缓存策略**：为静态资源设置长期缓存

## 安全建议

1. **API Key 安全**：
   - 确保 API Key 只保存在浏览器本地
   - 定期轮换 API Key
   - 监控 API 使用情况

2. **HTTPS**：
   - 始终使用 HTTPS
   - 配置 HSTS 头部

3. **内容安全策略**：
   - 配置 CSP 头部
   - 防止 XSS 攻击

## 支持

如有问题，请参考 [README.md](./README.md) 或提交 Issue。
