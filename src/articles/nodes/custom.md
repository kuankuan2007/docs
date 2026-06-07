# 编写自定义节点组件体系

自定义节点的入口是 `options.components`。键为节点 id，值为 Vue 组件。

## 一个最小可运行示例

下面用 `quote-block` 做示例：

```vue
<template>
  <div class="elegant-quote-block">
    <div class="label">💡 引用</div>
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { KMarkdownQuoteBlockNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
  node: KMarkdownQuoteBlockNode;
}>();
</script>
```

对应配置：

```ts
import MyCustomQuoteBlock from './MyCustomQuoteBlock.vue';

const options = {
  components: {
    'quote-block': MyCustomQuoteBlock,
  },
};
```

## 为什么这里用 `<slot />`

当前示例只演示最基础的容器写法。对于容器型节点，`<slot />` 是最简单、最稳妥的承接方式；如果你的节点结构需要更细的控制，可以在自己的实现里再展开处理。

## 覆盖兜底组件

如果需要接管未知节点或纯文本节点，可以使用两个符号键：

```ts
import { defaultSymbol, stringSymbol } from '@kuankuan/k-markdown-vue/src/symbols';

const options = {
  components: {
    [defaultSymbol]: MyUnknownNode,
    [stringSymbol]: MyStringNode,
  },
};
```

> 说明：这里使用的是当前版本提供的源码级子路径导入，适合仓库内联调或锁定版本场景。
