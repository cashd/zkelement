import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

// @ RYAN I had to convert all config files to cjs if project is an esm module
// https://github.com/sveltejs/vite-plugin-svelte/issues/141
// I dont think this current setup will work with a prod build hmm

// https://vitejs.dev/config/
export default defineConfig({
    root: './',
    publicDir: 'public',
    plugins: [
        react(),
        tsconfigPaths(),
        NodeGlobalsPolyfillPlugin({
            buffer: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: `${path.dirname(
                        require.resolve(`@aztec/sdk`)
                    )}/barretenberg.wasm`,
                    dest: '',
                },
                {
                    src: `${path.dirname(
                        require.resolve(`@aztec/sdk`)
                    )}/web_worker.js`,
                    dest: '',
                },
            ],
        }),
    ],
});
