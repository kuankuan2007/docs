# 自定义的高亮实现 (`options.highlight`)

当默认的 `highlight.js` 方案不够用时，可以把 `options.highlight` 替换为自定义实现。

## 真实接口签名

源码定义位于 `src/supports/highlight/highlighter.ts`：

```ts
export abstract class HighlightInterface<ResultInfo extends HighlighterInfo = HighlighterInfo> {
  abstract highlight(options: {
    code: string;
    preferLang?: string;
  }): HighlighterResult<ResultInfo> | Promise<HighlighterResult<ResultInfo>>;
}
```

配套类型：

```ts
export type HighlighterResult<Info extends HighlighterInfo = HighlighterInfo> = {
  html: string;
  info: Info;
};

export type HighlighterInfo = {
  langSupported: boolean;
  usingLang?: string;
  illegal?: boolean;
};
```

## 当前渲染链的承接方式

`KMdSupportHighlightInterface.vue` 不依赖 `Suspense`。它会：

- 调用 `highlight()`；
- 同时兼容同步返回值和 Promise；
- 将结果中的 `html` 写入 `<code v-html="...">`；
- 把 `info` 通过 `resolve-info` 事件抛给上层。

因此，自定义高亮器只需要满足返回值约定即可。

## 编写建议

1. 返回的 `html` 必须可安全注入。
2. 尽量完整填写 `info`，方便上层显示语言名或状态。
3. 如果内部会抛错，最好在 `highlight()` 里自行降级处理。

## 最小示例

```ts
import hljs from 'highlight.js';
import { HighlightInterface } from '@kuankuan/k-markdown-vue/src/supports/highlight';

class MyHighlighter extends HighlightInterface {
  highlight({ code, preferLang }: { code: string; preferLang?: string }) {
    if (preferLang && hljs.getLanguage(preferLang)) {
      const result = hljs.highlight(code, { language: preferLang, ignoreIllegals: true });
      return {
        html: result.value,
        info: {
          langSupported: true,
          usingLang: preferLang,
          illegal: result.illegal,
        },
      };
    }

    const result = hljs.highlightAuto(code);
    return {
      html: result.value,
      info: {
        langSupported: false,
        usingLang: result.language,
        illegal: result.illegal,
      },
    };
  }
}
```

> 说明：上面的 `src/supports/highlight` 子路径是当前仓库版本中可用的源码级导入方式，更适合仓库内联动开发或锁定版本使用。
