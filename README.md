# Svelte Inlined Template

Svelte starter template that inlines JS and CSS.

## Using this template

```sh
npx degit vsr/svelte-inlined-template svelte-app
cd svelte-app
npm i
```

## Development

```sh
npm i
npm run dev
```

## Production build

```sh
npm run build
```

## Template includes

- Tailwindcss for styling
- Postcss for processing(purge unused css, minify) styles
- Rollup replace plugin and dotenv to substitue any config data from environment variables.
