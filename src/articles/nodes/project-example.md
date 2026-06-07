# 教程：编写并应用自定义节点（项目实际用例）

本页记录的是“当前文档站自己的实现方式”。它基于仓库内部源码子路径导入，适合作为本仓库的实际案例，不应直接等同于对外公共 API 承诺。

## 当前项目实际覆盖了哪些节点

文档站在 `KMarkdownShower.vue` 中主要覆盖了两个节点：

- `code-block`：替换为 `KCustomCodeBlock.vue`
- `link`：替换为 `KCustomLink.vue`

同时启用了自定义高亮器：

- `highlight: highlighterByShiki`

## 当前项目中的注册方式

下面的写法与仓库里的真实实现保持一致：

```vue
<template>
  <k-markdown-vue :value="content" :options="options" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import KMarkdownVue from '@kuankuan/k-markdown-vue/src/KMarkdownVue.vue';
import defaultComponents from '@kuankuan/k-markdown-vue/src/nodesEle/default';
import { compomentsOptionsMarkRaw } from '@kuankuan/k-markdown-vue/src/options';
import type { KMarkdownVueOptions } from '@kuankuan/k-markdown-vue/src/options';

import KCustomCodeBlock from './markdown/KCustomCodeBlock.vue';
import KCustomLink from './markdown/KCustomLink.vue';
import { highlighterByShiki } from '@/scripts/codeHighlight';

const options = reactive({
  components: compomentsOptionsMarkRaw({
    ...defaultComponents,
    'code-block': KCustomCodeBlock as never,
    link: KCustomLink as never,
  }),
  highlight: highlighterByShiki,
  latex: 'show',
} as KMarkdownVueOptions);
</script>
```

## 覆盖链接节点的实际写法

对于链接节点，这里只保留“按站内/站外分流”的思路。实际组件可以按你的路由规则继续扩展：

```vue
<template>
  <router-link v-if="linkContent.inSite" :to="linkContent.href">
    <slot />
  </router-link>
  <a v-else :href="linkContent.href" target="_blank">
    <slot />
  </a>
</template>
```

如果你的项目不是 `router-link` 场景，也可以直接换成普通 `<a>`。

## 经验总结

1. 先展开默认组件表，再做局部覆盖。
2. 对容器型节点，优先使用 `<slot />` 承接子内容。
3. `compomentsOptionsMarkRaw()` 是性能优化工具，不是强制前置条件；在组件映射对象较大或长期复用时更值得使用。
