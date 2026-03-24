# Arctic Zvan Portfolio

基于 Next.js 15 + TypeScript + Tailwind CSS 构建的个人作品集网站。

## 特性

- 中英双语支持（next-intl）
- 暗色/亮色主题切换
- GSAP 开屏动画 + 滚动触发动画
- MDX 博客系统
- 联系表单（Resend 邮件发送）
- 响应式设计

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **动画**: GSAP + Framer Motion
- **国际化**: next-intl
- **博客**: MDX + rehype-pretty-code
- **部署**: Vercel + Zeabur

## 开始使用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并填写配置：

```bash
cp .env.example .env.local
```

## 许可证

MIT
