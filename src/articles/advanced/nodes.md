# AST 节点与扩展

所有解析完毕的 AST 对象都继承于 `KMarkdownNode` 核心基类。

## `KMarkdownNode` 生命周期与属性

```typescript
export class KMarkdownNode<T extends Record<string, any> = Record<string, any>> {
  // 识别标识符
  readonly id: string = '_SOURCE_CLASS';

  // 内部标记 - 判断是否允许容纳孙代解析
  readonly [nodeCanParseSubContent]: boolean = true;

  constructor(
    public content: KMarkdownNodeContent, // （弦节点，存放字串或者其它嵌套的 Node 实例）
    public args: T, // （节点独立持有的参数体字典，比如 href, src 等）
    public createBy: string | null // 这个节点的创建来源语法标识名是什么
  ) {}
}
```

## 内置节点与覆盖映射 (nodeMap)

官方自带了一大批对应的语法树节点类。例如：

1. `KMarkdownTitleNode`: 持有 `args: { id?: string; level: number }`，即标题等级。
2. `KMarkdownLinkNode`: 持有 `args: { href: string; alt: string; }`。
3. `KMarkdownTableNode` 及对应的 `Row/Cell` 派生节点。

如果遇到你需要彻底更改某个 Node 的抽象或携带更多状态参数。你并不需要直接硬编码去改组件源。可以通过修改实例化时的 `nodeMap`：

```typescript
import { defaultNodeMap } from '@kuankuan/k-markdown-parser/options';

class MyTitleNode extends KMarkdownTitleNode {
  // 你可以继承并改写你的解析结果参数逻辑
}

const customNodeMap = {
  ...defaultNodeMap,
  title: MyTitleNode,
};

const parser = new KMarkdownParser({ nodeMap: customNodeMap });
```

此时流水线匹配到 Title 后分发的节点将全部实例化为你配置的 `MyTitleNode`！
