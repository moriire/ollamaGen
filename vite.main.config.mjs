import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    resolve: {
        browserField: false,
        conditions: ["node"],
        mainFields: ["modules", "jsnext:main", "jsnext"],
    }
});
