import { defineConfig } from 'vite';

export default defineConfig({
    root: './day-08',
    build: {
        outDir: 'dist'
    },
    server: {
        port: 3000,
        open: '/visualize.html'
    }
});
