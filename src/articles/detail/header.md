# Header 自定义链接

本文说明如何在顶部导航栏（Header）中添加自定义图标链接，例如指向 GitHub 仓库的按钮。

---

## 1. 配置文件

所有 Header 链接的配置统一放在 `src/headerConfig.ts`：

```ts
type HeaderLinkConfig = {
  icon: string;
  href: string;
};

export const headerLinks: HeaderLinkConfig[] = [
  {
    icon: 'github',
    href: 'https://github.com/kuankuan2007/multi-page-document-template',
  },
];
```

`headerLinks` 是一个数组，每个元素对应 Header 右侧的一个图标按钮，按数组顺序从左到右排列。

---

## 2. 字段说明

| 字段   | 类型     | 说明                                                                                               |
| ------ | -------- | -------------------------------------------------------------------------------------------------- |
| `icon` | `string` | 要显示的图标 id，需与 `src/assets/fontello/config.json` 中 glyph 的 `css` 字段一致，详见 [Icon 系统](./icon) |
| `href` | `string` | 点击后跳转的 URL，固定在新标签页（`target="_blank"`）打开                                          |

---

## 3. 添加一个新链接

以新增一个指向 Gitee 仓库的按钮为例：

**第一步**：确认 icon 是否可用

查看 [Icon 系统](./icon) 文档，确认 `gitee` 已在字体集中；如果没有，需要先通过 fontello 将其加入并重新生成字体文件。

**第二步**：在 `src/headerConfig.ts` 中追加配置

```ts
export const headerLinks: HeaderLinkConfig[] = [
  {
    icon: 'github',
    href: 'https://github.com/kuankuan2007/multi-page-document-template',
  },
  {
    icon: 'gitee',
    href: 'https://gitee.com/kuankuan2007/multi-page-document-template',
  },
];
```

保存后，Header 右侧会立即出现新的图标按钮。

---

## 4. 删除或调整顺序

- **删除**：直接从 `headerLinks` 数组中移除对应条目即可。
- **调整顺序**：调整数组元素的排列顺序，即可改变按钮在 Header 中的显示顺序。

---

## 5. 实现参考

`KHeader.vue` 通过 `v-for` 遍历 `headerLinks` 渲染各链接：

```vue
<a
  v-for="(link, index) in headerLinks"
  :href="link.href"
  :key="index"
  target="_blank"
  class="header-button"
>
  <k-icon :id="link.icon" />
</a>
```

如需对某个链接添加额外属性（如 `rel`、`aria-label`），可以直接在 `HeaderLinkConfig` 类型中扩展字段并修改 `KHeader.vue` 中的模板。
