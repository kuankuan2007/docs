# doc-k-markdown-vue

[English README](./README.md) | 中文

`doc-k-markdown-vue` 是 `@kuankuan/k-markdown-vue` 的文档站项目。

## 作用

这个项目一方面承载文档内容，另一方面也作为真实接入示例，展示了：

- 自定义节点覆盖
- 自定义代码高亮器
- 站内 / 站外链接处理
- LaTeX 渲染

## 开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

## 目录说明

- `src/articles/`：文档正文
- `src/components/`：文档站组件
- `src/scripts/`：高亮与链接处理等脚本

## 说明

文档站中有少量示例会直接引用 `k-markdown-vue` 的源码子路径，这属于当前仓库内部联动开发场景，并不等同于对外的稳定公共 API 承诺。
