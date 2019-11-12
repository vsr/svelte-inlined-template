const tailwindcss = require("tailwindcss");

// only needed if you want to purge
const purgecss = require("@fullhuman/postcss-purgecss")({
    content: ["./src/**/*.svelte", "./public/**/*.html"],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

const cssnano = require("cssnano")({
    preset: 'default',
})

module.exports = {
    plugins: [
        tailwindcss("./tailwind.js"),

        // only needed if you want to purge
        ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : [])
    ]
};