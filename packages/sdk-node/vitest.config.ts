import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['./src/**/*.{test,spec}.ts', './src/**/*.{test,spec}-d.ts'],
        globals: true,
        environment: 'node',
        setupFiles: ['dotenv/config']
    }
});
