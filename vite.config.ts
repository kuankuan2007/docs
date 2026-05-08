import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import autoImport from 'unplugin-auto-import/vite';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import VitePluginShikiAutoImport from './vite-plugin/kShikiAutoImport';
const sassAddition = `
@use '@/styles/theme.scss';
@use '@kuankuan/assist-2026/styles/motion.scss';
@use 'sass:math';
@use 'sass:color';`;

const dirname = import.meta.dirname.replaceAll('\\', '/');

function getNodeModulesRegexp(name: string): RegExp {
  return new RegExp(`node_modules/(.*/)*${name}(@.*)/`);
}

type Spliter = RegExp | string | ((id: string) => boolean);

function testSpliter(spliter: Spliter, id: string): boolean {
  if (typeof spliter === 'string') {
    return id.includes(spliter);
  }
  if (typeof spliter === 'function') {
    return spliter(id);
  }
  return id.match(spliter) !== null;
}

const chunkConfig: Record<string, Spliter[]> = {
  kmarkdown: [
    getNodeModulesRegexp('@kuankuan\\+k-markdown-parser'),
    getNodeModulesRegexp('@kuankuan\\+k-markdown-vue'),
  ],
  katex: [getNodeModulesRegexp('katex')],
  hightlight: [getNodeModulesRegexp('highlight.js')],
  shiki: [
    ...[
      getNodeModulesRegexp('shiki'),
      getNodeModulesRegexp('@shikijs\\+core'),
      getNodeModulesRegexp('@shikijs\\+engine-oniguruma'),
    ].map(
      (reg) => (id: string) => reg.test(id) && !id.includes('/langs/') && !id.includes('/themes/')
    ),
  ],
};
const extToDir = {
  script: ['.js'],
  style: ['.css'],
  font: ['.ttf', '.woff', '.woff2', '.eot', '.otf'],
  image: ['.png', '.jpg', '.svg', '.gif'],
} as const;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Inspect(),
    autoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/types/auto-imports.d.ts',
    }),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: './temp/test.html',
      open: true,
    }),
    VitePluginShikiAutoImport({
      lang: {
        static: ['typescript', 'javascript', 'bash', 'css'],
        dynamic: [
          'python',
          'rust',
          'go',
          'java',
          'c',
          'cpp',
          'html',
          'scss',
          'json',
          'vue',
          'markdown',
        ],
      },
      theme: {
        static: ['github-light', 'github-dark'],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
          grid: true,
        }),
        cssnano(),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: sassAddition,
      },
      sass: {
        additionalData: sassAddition,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: Object.entries(chunkConfig).map(([key, value]) => ({
            name: key,
            test: (id) => value.some((item) => testSpliter(item, id)),
          })),
        },
        entryFileNames: function (chunkInfo) {
          const pathName = (
            path.dirname(chunkInfo.facadeModuleId!).slice(__dirname.replace(/\\/g, '/').length) +
            '/script/[name]-[hash].js'
          ).slice(1);
          return pathName;
        },
        chunkFileNames: function (chunk) {
          for (const modules of chunk.moduleIds) {
            if (
              modules.includes('node_modules/shiki/dist/langs') ||
              modules.includes('node_modules/@shikijs/langs')
            ) {
              return 'script/shiki/langs/[name]-[hash].js';
            }
            if (
              modules.includes('node_modules/shiki/dist/themes') ||
              modules.includes('node_modules/@shikijs/themes')
            ) {
              return 'script/shiki/themes/[name]-[hash].js';
            }
            if (modules.includes('src/articles')) {
              const rPath = path.relative(path.resolve(dirname, 'src/articles'), modules!);
              const prefix = path.join('articles', path.dirname(rPath)).replace(/\\/g, '/');
              return `${prefix}/[name]-[hash].js`;
            }
          }
          return 'script/[name]-[hash].js';
        },
        assetFileNames: function (chunkInfo) {
          if (chunkInfo.source === '/* vite internal call, ignore */') {
            return chunkInfo.names[0];
          }

          for (const i in extToDir) {
            if (
              extToDir[i as keyof typeof extToDir].some((ext) => chunkInfo.names[0].endsWith(ext))
            ) {
              return `${i}/[name]-[hash].[ext]`;
            }
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
});
