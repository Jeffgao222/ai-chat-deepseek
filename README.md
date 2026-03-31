# AI Chat DeepSeek

一个支持多 AI 智能体聊天的网站，集成 DeepSeek API，提供类似 ChatGPT 的聊天界面。

## 功能特性

- **多 AI 智能体**：预设 5 个不同角色的 AI 助手
  - 跨境电商专家
  - 健身教练
  - 营销专家
  - 技术顾问
  - 通用助手

- **本地存储**：API Key 和聊天记录保存在浏览器 localStorage，不上传服务器
- **多轮对话**：支持连续对话，保持上下文
- **现代化 UI**：类似 ChatGPT 的界面设计，使用 TailwindCSS 样式

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite
- **样式框架**：TailwindCSS
- **API**：DeepSeek Chat API

## 快速开始

### 1. 安装依赖

```bash
cd ai_chat_deepseek
npm install
# 或使用 pnpm
pnpm install
```

### 2. 开发模式运行

```bash
npm run dev
# 或
pnpm dev
```

应用将在 `http://localhost:5173` 启动

### 3. 生产构建

```bash
npm run build
# 或
pnpm build
```

构建输出在 `dist` 目录

### 4. 预览生产构建

```bash
npm run preview
# 或
pnpm preview
```

## 使用说明

### 第一步：获取 DeepSeek API Key

1. 访问 [DeepSeek 平台](https://platform.deepseek.com)
2. 注册或登录账户
3. 进入 [API Keys 页面](https://platform.deepseek.com/api_keys)
4. 创建新的 API Key
5. 复制 API Key

### 第二步：启动应用

1. 运行 `npm run dev` 启动开发服务器
2. 在浏览器中打开 `http://localhost:5173`
3. 在 API Key 输入框中粘贴您的 DeepSeek API Key
4. 点击"开始聊天"按钮

### 第三步：开始聊天

1. 在左侧选择不同的 AI 智能体
2. 在右侧输入您的问题
3. 按 Enter 或点击"发送"按钮发送消息
4. 等待 AI 回复

## 项目结构

```
ai_chat_deepseek/
├── src/
│   ├── components/
│   │   ├── ApiKeySetup.jsx      # API Key 设置页面
│   │   ├── ChatApp.jsx          # 主聊天应用
│   │   ├── AgentList.jsx        # AI 智能体列表
│   │   ├── ChatWindow.jsx       # 聊天窗口
│   │   ├── MessageList.jsx      # 消息列表
│   │   └── MessageInput.jsx     # 消息输入框
│   ├── config/
│   │   └── agents.js            # AI 智能体配置
│   ├── App.jsx                  # 主应用组件
│   ├── main.jsx                 # 入口文件
│   └── index.css                # 全局样式
├── index.html                   # HTML 模板
├── package.json                 # 项目配置
├── vite.config.js              # Vite 配置
├── tailwind.config.js          # TailwindCSS 配置
├── postcss.config.js           # PostCSS 配置
└── README.md                    # 本文件
```

## 数据存储

应用使用浏览器的 localStorage 存储以下数据：

- **deepseek_api_key**：用户的 DeepSeek API Key
- **conversations**：所有对话记录，按 Agent ID 分组

所有数据都保存在本地浏览器中，不会发送到任何服务器。

## API 调用

应用直接从浏览器调用 DeepSeek API：

```
POST https://api.deepseek.com/v1/chat/completions
```

请求头：
- `Authorization: Bearer {API_KEY}`
- `Content-Type: application/json`

请求体：
```json
{
  "model": "deepseek-chat",
  "messages": [
    {"role": "system", "content": "系统提示词"},
    {"role": "user", "content": "用户消息"},
    {"role": "assistant", "content": "AI 回复"}
  ],
  "temperature": 0.7
}
```

## 部署

### 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 选择 "Other" 作为框架
4. 构建命令：`npm run build`
5. 输出目录：`dist`
6. 点击 Deploy

### 部署到 Netlify

1. 将项目推送到 GitHub
2. 在 [Netlify](https://netlify.com) 中连接 GitHub 仓库
3. 构建命令：`npm run build`
4. 发布目录：`dist`
5. 点击 Deploy

### 部署到其他静态托管

1. 运行 `npm run build` 生成 `dist` 目录
2. 将 `dist` 目录的内容上传到您的托管服务
3. 配置服务器以支持 SPA 路由（所有请求重定向到 index.html）

## 常见问题

### Q: 我的 API Key 安全吗？
A: 是的。您的 API Key 只保存在您的浏览器本地存储中，不会发送到任何第三方服务器。所有 API 调用都直接从您的浏览器发送到 DeepSeek。

### Q: 我可以自定义 AI 智能体吗？
A: 可以。编辑 `src/config/agents.js` 文件，修改 `AGENTS` 数组中的智能体配置。

### Q: 对话记录会保存多久？
A: 对话记录保存在您的浏览器 localStorage 中。清除浏览器数据或禁用 localStorage 会删除所有记录。

### Q: 我可以在多个设备上使用相同的 API Key 吗？
A: 可以，但每个设备都需要单独输入 API Key。对话记录不会跨设备同步。

## 许可证

MIT

## 支持

如有问题或建议，请提交 Issue 或 Pull Request。
