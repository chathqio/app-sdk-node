import { readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

import type { BuildOptions, UserConfig } from 'vite';
import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';

import globalPackageJson from './package.json';

config();

const external = [
    // common
    'tslib',
    'vue',
    'react',
    'react-dom',
    // core
    '@chathqio/app-sdk-node',
    '@chathqio/app-sdk-contracts',
    '@chathqio/app-sdk-eslint-config'
];

function isObject(item: unknown): item is Record<string, unknown> {
    return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep<T>(target: T, ...sources: T[]): T {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key] as T, source[key] as T);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

function viteBuild(path: string, options: BuildOptions = {}): BuildOptions {
    const dir = dirname(path);
    const packageDirName = basename(dir);
    const packageJsonFile = resolve(dir, 'package.json');

    console.table({ path, dir, packageDirName, packageJsonFile });

    const packageJson = JSON.parse(
        readFileSync(packageJsonFile, { encoding: 'utf-8' })
    );
    const deps = {
        ...(packageJson.dependencies || {}),
        ...(packageJson.devDependencies || {}),
        ...(packageJson.peerDependencies || {}),
        ...(globalPackageJson.devDependencies || {})
        // ...(globalPackageJson.dependencies || {}),
    };
    return mergeDeep<BuildOptions>(
        {
            sourcemap: true,
            emptyOutDir: false,
            lib: {
                entry: resolve(dir, 'src', 'index.ts'),
                name: `chathq-app-${packageDirName}`,
                fileName: libFileName,
                formats: ['es']
            },
            rollupOptions: {
                external: Array.from(
                    new Set([...Object.keys(deps), ...external])
                ),
                output: {
                    dir: resolve(dir, 'lib')
                }
            }
        },
        options
    );
}

export function libFileName(format: string) {
    return `index.${format}.js`;
}

/**
 * Config for plugins
 *
 * @param packageDirName - package directory name
 * @param options - custom options
 * @returns user config
 */
export function pluginViteConfig(
    packageDirName: string,
    options: UserConfig = {}
) {
    return defineConfig({
        ...options,
        build: viteBuild(packageDirName, options.build)
    });
}

export default defineConfig({
    test: {
        include: ['packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        environment: 'node',
        setupFiles: ['dotenv/config']
    }
});
