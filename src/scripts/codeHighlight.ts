import { getShikiWith } from 'visual:k-shiki-auto-import.ts';
import flourite from 'flourite';
import hljs from 'highlight.js';

import type { HighlightInterface } from '@kuankuan/k-markdown-vue/src/supports/highlight';
import type { HighlighterResult } from '@kuankuan/k-markdown-vue/src/supports/highlight';
import type { HighlighterInfo } from '@kuankuan/k-markdown-vue/src/supports/highlight';

export type HighlighterInfoByShiki = HighlighterInfo & {
  highlightBy: 'hljs' | 'shiki';
};

function guessCodeLanguage(code: string) {
  return flourite(code, { shiki: true }).language;
}
async function highlightCode(
  code: string,
  lang?: string
): Promise<HighlighterResult<HighlighterInfoByShiki>> {
  if (!lang) {
    lang = guessCodeLanguage(code);
  }
  const result = await getShikiWith([lang], ['github-dark', 'github-light']);
  return {
    html: result.codeToHtml(code, {
      lang,
      structure: 'inline',
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
      defaultColor: false,
    }),
    info: {
      usingLang: lang,
      langSupported: true,
      highlightBy: 'shiki',
    },
  };
}
export const highlighterByShiki: HighlightInterface<HighlighterInfoByShiki> = {
  async highlight({ code, preferLang }) {
    if (!preferLang) {
      preferLang = guessCodeLanguage(code);
    }
    return highlightCode(code, preferLang).catch((error) => {
      console.error(error);
      if (hljs.getLanguage(preferLang)) {
        const hljsResult = hljs.highlight(code, { language: preferLang, ignoreIllegals: true });
        return {
          html: hljsResult.value,
          info: {
            langSupported: true,
            usingLang: preferLang,
            illegal: hljsResult.illegal,
            highlightBy: 'hljs',
          },
        };
      } else {
        const hljsResult = hljs.highlightAuto(code);
        return {
          html: hljsResult.value,
          info: {
            langSupported: false,
            usingLang: hljsResult.language,
            illegal: hljsResult.illegal,
            highlightBy: 'hljs',
          },
        };
      }
    });
  },
};
