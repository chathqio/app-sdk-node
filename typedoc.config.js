/**
 * Options for plugin `typedoc-plugin-extras`
 */
const pluginOptionsExtras = {
    favicon: './assets/favicon.ico',
    footerLastModified: true
};

/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
    extends: ['./typedoc.base.json'],

    // ************************
    // Content
    // ************************
    name: 'ChatHQ Apps SDK',
    categorizeByGroup: true,

    // ************************
    // Input
    // ************************
    tsconfig: './tsconfig.docs.json',
    entryPointStrategy: 'packages',
    entryPoints: ['packages/*'],
    // ************************
    // Output
    // ************************
    out: './docs',

    // ************************
    // Plugin Options
    // ************************
    plugin: ['typedoc-plugin-extras', 'typedoc-plugin-mdn-links'],
    ...pluginOptionsExtras
};
