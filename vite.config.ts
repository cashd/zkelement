import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

// @ RYAN I had to convert all config files to cjs if project is an esm module
// https://github.com/sveltejs/vite-plugin-svelte/issues/141
// I dont think this current setup will work with a prod build hmm
// console.log(path.dirname(require.resolve(`@aztec/sdk`)));
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        viteStaticCopy({
            targets: [
                {
                    src: `bin/barretenberg.wasm`,
                    dest: '',
                },
                {
                    src: `bin/web_worker.js`,
                    dest: '',
                },
            ],
        }),
    ],
});
