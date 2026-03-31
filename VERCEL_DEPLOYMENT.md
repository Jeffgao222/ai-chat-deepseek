# 部署到 Vercel - 快速指南

本指南将帮助您将 AI Chat DeepSeek 应用部署到 Vercel，获得一个永久的在线网站。

## 📋 前置要求

- GitHub 账户（用户名：`Jeffgao222`）
- Vercel 账户（免费）

## 🚀 部署步骤

### 第一步：初始化 Git 仓库（如果还未初始化）

```bash
cd /home/ubuntu/ai_chat_deepseek
git init
git add .
git commit -m "Initial commit: AI Chat DeepSeek application"
```

### 第二步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `ai-chat-deepseek`
   - **Description**: AI Chat Web App with DeepSeek API
   - **Public/Private**: 选择 Public（推荐）
3. 点击 "Create repository"

### 第三步：推送代码到 GitHub

```bash
cd /home/ubuntu/ai_chat_deepseek

# 添加远程仓库
git remote add origin https://github.com/Jeffgao222/ai-chat-deepseek.git

# 重命名分支为 main（如果需要）
git branch -M main

# 推送代码
git push -u origin main
```

### 第四步：在 Vercel 上部署

#### 方法 1：使用 Vercel 网站（推荐）

1. 访问 https://vercel.com
2. 点击 "Sign Up" 或 "Log In"
3. 选择 "Continue with GitHub"
4. 授权 Vercel 访问您的 GitHub 账户
5. 在 Vercel 仪表板中，点击 "New Project"
6. 选择 "Import Git Repository"
7. 搜索并选择 `ai-chat-deepseek` 仓库
8. 配置项目设置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
9. 点击 "Deploy"

#### 方法 2：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署应用
cd /home/ubuntu/ai_chat_deepseek
vercel --prod
```

### 第五步：配置自定义域名（可选）

1. 在 Vercel 项目设置中找到 "Domains"
2. 点击 "Add Domain"
3. 输入您的自定义域名
4. 按照说明配置 DNS 记录

## ✅ 验证部署

部署完成后，您将获得一个 Vercel 域名，格式为：
```
https://ai-chat-deepseek.vercel.app
```

或您的自定义域名。

## 🔄 后续更新

部署完成后，任何推送到 GitHub 的更改都会自动部署到 Vercel：

```bash
# 本地修改代码后
git add .
git commit -m "Update: 修改说明"
git push origin main

# Vercel 会自动检测并部署新版本
```

## 🆘 常见问题

### Q: 部署失败，显示"Build failed"

**A:** 检查以下几点：
1. 确保所有依赖都在 `package.json` 中
2. 检查构建命令是否正确
3. 查看 Vercel 的构建日志获取详细错误信息

### Q: 应用部署后无法访问

**A:** 可能的原因：
1. 部署还在进行中，请稍候几分钟
2. 检查 DNS 配置（如果使用自定义域名）
3. 清除浏览器缓存

### Q: 如何回滚到之前的版本

**A:** 在 Vercel 仪表板中：
1. 进入项目
2. 找到 "Deployments" 标签
3. 选择之前的部署
4. 点击 "Promote to Production"

### Q: 如何删除部署

**A:** 在 Vercel 仪表板中：
1. 进入项目设置
2. 滚动到底部
3. 点击 "Delete Project"

## 📊 部署后的性能

Vercel 提供：
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 自动备份
- ✅ 实时日志
- ✅ 性能分析

## 🔐 安全建议

1. **API Key 安全**：
   - 确保 API Key 只在浏览器本地存储
   - 不要在代码中硬编码 API Key
   - 定期检查 API 使用情况

2. **环境变量**：
   - 如果需要环境变量，在 Vercel 项目设置中配置
   - 敏感信息使用环境变量，不要提交到 GitHub

3. **GitHub 安全**：
   - 使用强密码保护 GitHub 账户
   - 启用两因素认证
   - 定期审查 GitHub 访问权限

## 📞 获取帮助

- Vercel 文档：https://vercel.com/docs
- Vercel 支持：https://vercel.com/support
- GitHub 帮助：https://docs.github.com

## 🎉 部署完成

恭喜！您的 AI Chat DeepSeek 应用现已在线运行。

您可以：
1. 分享您的网站链接给其他人
2. 继续开发和改进应用
3. 监控应用的性能和使用情况

---

**需要帮助？** 如有任何问题，请参考 [DEPLOYMENT.md](./DEPLOYMENT.md) 或 [README.md](./README.md)
