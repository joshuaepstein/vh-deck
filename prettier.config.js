/** @type{import ("prettier").Config} */
module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    endOfLine: "lf",
    printWidth: 100,


    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    organizeImportsSkipDestructiveCodeActions: true,
    tailwindFunctions: ["cn", "clsx", "tw"],
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-packagejson",
        "prettier-plugin-organize-imports",
        "prettier-plugin-tailwindcss"
    ]
}