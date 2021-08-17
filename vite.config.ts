import { defineConfig } from 'vite';
import path from 'path';
import { name, version } from './package.json';

const resolve = (url: string) => path.resolve(__dirname, url);

export default defineConfig({
    build: {
        lib: {
            entry: resolve("src/index.ts"),
            name: "BaseWebUI",
            formats: ["es","umd"],
            fileName: "index",
        },
        outDir: './lib',
    },
    define: {
        pkgJson: { name, version },
    },
    esbuild: {
        jsxFactory: 'DOMcreateElement',
        jsxFragment: 'DOMcreateFragment',
        jsxInject: `import { DOMcreateElement, DOMcreateFragment } from '@/dom-helper/jsxFactory';`,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly', // 开启dash到camelCase抓换，// .apply-color -> applyColor
        },
    },
    server: {
        port: 3101,
        open: true, // Automatically open the app in the browser on server start.
    },
    plugins: [
        // babel(),
        // babel({ babelHelpers: 'bundled' }),
    ],
});
