import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { netlifyPlugin } from '@netlify/remix-adapter/plugin';
import path from 'node:path';

export default defineConfig({
    plugins: [remix(), netlifyPlugin(), tsconfigPaths()],
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, './app/src/styles/'),
        },
    },
});
