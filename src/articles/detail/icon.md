# Icon 系统

本文说明本项目中 icon 的来源、管理方式、运行时使用方式，以及后续更新流程。

## 1. 设计来源

本项目中的绝大多数 icon 都是宽宽自己原创绘制。

只有少数“特殊用途”的图标不在此范围内，例如：

- `github` 使用的是 Github 的品牌 logo

这套 icon 统一通过 **fontello** 提供的字体格式进行管理，因此项目运行时使用的是一套 icon font，而不是一堆零散的 svg 文件。

## 2. 相关目录

icon 相关文件集中在 `src/assets/fontello/`：

- `config.json`
  - 保存 fontello 的配置数据
- `data.ts`
  - 从 `config.json` 中提取可用图标映射，导出为 `{ [id]: codePoint }`
- `font-defines.scss`
  - 定义 `@font-face`
- `font/`
  - 存放 fontello 导出的字体文件
- `fontello.scss`
  - 提供字体类对应的样式封装

当前 `data.ts` 的生成逻辑很直接：它会读取 `config.json` 里的 `glyphs`，并将每个条目的 `css` 字段映射为 code point。

也就是说，项目里 icon 的“可用 id”来源于 `config.json` 中各个 glyph 的 `css` 字段。

例如当前项目内可直接使用的 id 包括：

- `light`
- `night`
- `os-follow`
- `copy`
- `down`
- `right`
- `tick`
- `article`
- `menu`
- `github`

## 3. 在项目中如何使用

项目内统一通过 `KIcon` 组件渲染图标。

示例：

```vue
<KIcon id="copy" />
<KIcon id="github" inline />
```

其中：

- `id`
  - 指定要渲染的 icon
- `inline`
  - 控制是否以内联方式显示

在当前实现中，`KIcon` 会用传入的 `id` 去读取 `src/assets/fontello/data.ts` 导出的映射表，再通过字体 code point 输出对应字符。

因此传入的 `id` 必须和 `config.json` 中对应 glyph 的 `css` 字段保持一致；从运行结果上看，这也就是项目内实际使用的 icon id。

## 4. 如何更新 icon

当你在 fontello 中调整图标后，不需要手动复制文件，直接使用下面这条指令：

如果你需要在原有图标集上继续编辑，可以把 `src/assets/fontello/config.json` 直接拖拽到 fontello 网页中。
fontello 会自动把图标加载到 `Custom Icons` 区域，并尽量恢复当前 id（即项目里正在使用的图标标识）。
修改完成后重新下载 zip，再执行 `pnpm run load-fontello` 同步即可。

具体操作细节可参考 fontello 官方网站：<https://fontello.com/>

```bash
pnpm run load-fontello <fontello 导出的 zip 文件>
```

例如：

```bash
pnpm run load-fontello i:\kuankuan\Downloads\fontello-xxxx.zip
```

该指令会自动完成以下事情：

1. 将 zip 中的字体文件复制到 `src/assets/fontello/font/`
2. 过滤掉 `selected: false` 的 glyph，并将结果保存到 `src/assets/fontello/config.json`
3. 更新 `src/assets/fontello/font-defines.scss` 中字体文件 URL 后的 `?时间戳`
   - 这样可以在字体更新后主动打破缓存，避免浏览器继续使用旧字体

也就是说，正常情况下你**不需要手动维护**字体文件、`config.json` 过滤逻辑，或者 `font-defines.scss` 里的缓存参数。

## 5. `load-fontello` 的来源

`load-fontello` 不是这个项目私有的临时脚本，而是由 `@kuankuan/assist-2026` 包提供的公共脚本。

这个包是宽宽把多个项目之间需要复用的能力抽离出来后集中维护的公共包；本项目里的主题管理等能力，同样也是由这个包提供。

之所以把 icon 更新流程也放进这个包里，是因为这套基于 fontello 的 icon 管理策略，本身就是宽宽多个主要项目共用的一套方案。

## 6. 维护建议

- 新增 icon 时，优先保持 `css` 命名稳定
- 如果某个 icon 已废弃，可以在 fontello 中取消选中，再通过 `load-fontello` 同步到项目
- 如果你修改了图标但页面没有变化，优先检查字体缓存是否已被新的时间戳打破
- 如果某个 `KIcon` 没有显示，优先检查传入的 `id` 是否存在于 `src/assets/fontello/data.ts` 导出的 key 中
