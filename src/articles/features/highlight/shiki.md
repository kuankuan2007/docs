# 项目自身的实现：Shiki + HLJS 兜底

当前文档站不是直接使用默认高亮器，而是自定义了 `highlighterByShiki`。实际实现位于 `src/scripts/codeHighlight.ts`。

## 实现思路

当前方案分三步：

1. 使用 `flourite` 对未显式标注语言的代码做语言猜测。
2. 优先调用 Shiki 生成高亮 HTML。
3. 若 Shiki 不可用或抛错，则回退到 `highlight.js`。

## 与库接口的对应关系

该实现遵守 `HighlightInterface` 的 `highlight({ code, preferLang })` 约定，并返回：

- `html`
- `info.langSupported`
- `info.usingLang`
- `info.illegal`
- 额外的 `info.highlightBy`

## 在当前文档站中的挂载方式

```ts
import { reactive } from 'vue';
import { highlighterByShiki } from '@/scripts/codeHighlight';

const options = reactive({
  highlight: highlighterByShiki,
});
```

这段写法已经在当前仓库中真实使用，可以作为“异步高亮器 + 同步兜底”的参考实现。
