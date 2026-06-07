# 安装与快速开始

## 安装

```bash
npm i @kuankuan/k-markdown-vue
```

## 快速开始

```vue
<template>
  <KMarkdownVue :value="md" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KMarkdownVue from '@kuankuan/k-markdown-vue';

// 组件库样式（包含从 KaTeX 提取出的 CSS）
import '@kuankuan/k-markdown-vue/dist/index.css';

// 从 highlight.js 选一个主题即可
import 'highlight.js/styles/monokai-sublime.css';

const md = ref(`# 你好\n\n行内公式：$a^2+b^2=c^2$\n\n\`\`\`ts\nconst x: number = 1\n\`\`\``);

const options = {
  latex: 'default',
  xml: 'warn',
};
</script>
```

可选（仓库内样式建议）：本仓库还提供了 `styles/suggestion.scss`，内含一个 highlight.js 主题与少量 Markdown
友好样式（需要你的构建环境支持 Sass）。
