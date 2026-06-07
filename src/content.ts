export declare type ArticleOptions = {
  article: string;
  title: string;
  subArticles?: Record<string, ArticleOptions>;
};

const content: ArticleOptions = {
  article: 'index.md',
  title: '简介',
  subArticles: {
    start: {
      article: 'start.md',
      title: '安装与快速开始',
    },
    architecture: {
      article: 'architecture.md',
      title: '架构设计',
    },
    features: {
      article: 'features/index.md',
      title: '核心特性',
      subArticles: {
        latex: {
          article: 'features/latex.md',
          title: 'LaTeX 数学公式',
        },
        highlight: {
          article: 'features/highlight/index.md',
          title: '代码高亮与默认实现',
          subArticles: {
            custom: {
              article: 'features/highlight/custom.md',
              title: '自定义高亮接口',
            },
            shiki: {
              article: 'features/highlight/shiki.md',
              title: '项目用例: Shiki 兜底方案',
            },
          },
        },
        xml: {
          article: 'features/xml.md',
          title: 'XML 安全策略',
        },
      },
    },
    api: {
      article: 'api.md',
      title: 'API',
    },
    nodes: {
      article: 'nodes/index.md',
      title: '节点渲染机制',
      subArticles: {
        builtin: {
          article: 'nodes/built-in.md',
          title: '内置节点组件',
        },
        custom: {
          article: 'nodes/custom.md',
          title: '自定义节点组件',
        },
        project: {
          article: 'nodes/project-example.md',
          title: '项目用例: 自定义组件教程',
        },
      },
    },
    parser: {
      article: 'parser.md',
      title: '解析器选项',
    },
    dev: {
      article: 'dev.md',
      title: '开发与许可',
    },
  },
};
export const notFound: ArticleOptions = {
  article: '404.md',
  title: 'Not Found',
};
export default content;
