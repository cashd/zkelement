import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    root: './',
    publicDir: 'public',
    plugins: [
        react(),
        tsconfigPaths(),
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
