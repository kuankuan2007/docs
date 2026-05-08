import { Plugin } from 'vite';

const MODULE_ID = 'visual:k-shiki-auto-import.ts';

const LOAD_MODULE_ID = '\0' + MODULE_ID;

type StaticModuleConfig = string | { module: string };
type DynamicModuleConfig =
  | string
  | { name: string; module: string }
  | { name: string; importer: string };

function parserStaticModuleConfig(
  config: StaticModuleConfig,
  importName: string,
  getModule: (value: string) => string
) {
  if (typeof config === 'string') {
    return {
      code: `import ${importName} from '${getModule(config)}'`,
      varName: importName,
    };
  }
  if (typeof config === 'object' && config !== null) {
    if (!config.module) {
      throw new Error(`Unknown static config type:${config}`);
    }
    return {
      code: `import ${importName} from '${config.module}';`,
      varName: importName,
    };
  }
  throw new Error(`Unknown static config type:${config}`);
}

function parserDynamicModuleConfig(
  config: DynamicModuleConfig,
  getModule: (value: string) => string
) {
  if (typeof config === 'string') {
    return { name: config, code: `()=>import('${getModule(config)}')` };
  }
  if (typeof config === 'object' && config !== null) {
    if ('module' in config) {
      return { name: config.name, code: `()=>import('${config.module}')` };
    }
    if ('importer' in config) {
      return { name: config.name, code: config.importer };
    } else {
      throw new Error(`Unknown dynamic config type:${config}`);
    }
  }
  throw new Error(`Unknown dynamic config type:${config}`);
}

function getBundleLangModule(lang: string) {
  return `shiki/langs/${lang}.mjs`;
}
function getBundleThemeModule(theme: string) {
  return `shiki/themes/${theme}.mjs`;
}

export default function VitePluginShikiAutoImport(options: {
  readonly theme: {
    readonly static?: StaticModuleConfig[];
    readonly dynamic?: DynamicModuleConfig[];
  };
  readonly lang: {
    readonly static?: StaticModuleConfig[];
    readonly dynamic?: DynamicModuleConfig[];
  };
}): Plugin {
  const staticLangs = (options.lang.static ?? []).map((i, index) =>
    parserStaticModuleConfig(i, `$kShikiAutoImportLangs${index}`, getBundleLangModule)
  );
  const staticThemes = (options.theme.static ?? []).map((i, index) =>
    parserStaticModuleConfig(i, `$kShikiAutoImportThemes${index}`, getBundleThemeModule)
  );

  const dynamicLangs = (options.lang.dynamic ?? []).map((i) =>
    parserDynamicModuleConfig(i, getBundleLangModule)
  );
  const dynamicThemes = (options.theme.dynamic ?? []).map((i) =>
    parserDynamicModuleConfig(i, getBundleThemeModule)
  );

  return {
    name: 'vite-plugin-shiki-auto-import',
    resolveId(id) {
      if (id === MODULE_ID) {
        return LOAD_MODULE_ID;
      }
    },
    async load(id) {
      if (id === LOAD_MODULE_ID) {
        return `
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki';

${staticLangs.map((i) => i.code).join('\n')}
${staticThemes.map((i) => i.code).join('\n')}

import wasmEngine from 'shiki/wasm';
const shikiPromise = createHighlighterCore({
  langs: [${staticLangs.map((i) => i.varName).join(',')}],
  themes: [${staticThemes.map((i) => i.varName).join(',')}],
  engine: createOnigurumaEngine(wasmEngine),
});

let shiki;

shikiPromise.then((s) => (shiki = s));
export async function getShiki() {
  if (shiki) {
    return shiki;
  }
  return shikiPromise;
}

export const dynamicLangs = {
  ${dynamicLangs.map((i) => `'${i.name}': () => ${i.code},`).join('\n')}
};
export const dynamicThemes = {
  ${dynamicThemes.map((i) => `'${i.name}': () => ${i.code},`).join('\n')}
};
export async function loadLangs(shiki, langs) {
  for(const lang of langs) {
    if (shiki.getLoadedLanguages().includes(lang)) {
      return;
    }
    if (lang in dynamicLangs) {
      await shiki.loadLanguage(dynamicLangs[lang]());
    } else {
      throw new Error('Unknown language');
    }
  }
}
export async function loadThemes(shiki, themes) {
  for(const theme of themes) {
    if (shiki.getLoadedThemes().includes(theme)) {
      return;
    }
    if (theme in dynamicThemes) {
      await shiki.loadTheme(dynamicThemes[theme]());
    } else {
      throw new Error('Unknown theme');
    }
  }
}

export async function getShikiWith(langs, themes) {
  const shiki = await getShiki();
  langs && await loadLangs(shiki, langs);
  themes && await loadThemes(shiki, themes);
  return shiki;
}
`;
      }
    },
  };
}
