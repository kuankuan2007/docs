/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'showdown-katex' {
  const showdownKatex: any;
  export default showdownKatex;
}

declare module 'visual:k-shiki-auto-import.ts' {
  type AnyHighlighterGeneric = import('shiki').HighlighterGeneric<any, any>;
  export declare function getShiki(): Promise<import('shiki').HighlighterCore>;
  export declare const dynamicLangs: {
    vue: () => Promise<typeof import('shiki/dist/langs/vue.mjs')>;
  };
  export declare const dynamicThemes: {
    vue: () => Promise<typeof import('shiki/dist/langs/vue.mjs')>;
  };
  export declare function loadLangs(shiki: AnyHighlighterGeneric, langs: string[]): Promise<void>;
  export declare function loadThemes(shiki: AnyHighlighterGeneric, themes: string[]): Promise<void>;
  export declare function getShikiWith(langs: string[], themes: string[]): Promise<import('shiki').HighlighterCore>;
  export {};
}
