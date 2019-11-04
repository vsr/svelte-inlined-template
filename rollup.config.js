import fs from "fs-extra";
import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import {
  terser
} from "rollup-plugin-terser";
import rollup_start_dev from "./rollup_start_dev";

const production = !process.env.ROLLUP_WATCH;

const DIST_DIR = "dist";
const PUBLIC_DIR = "public";

// Rollup doesn't seem to have reliable means for setting up fresh distribution directory
// so let's just clean up and copy static assets here.
fs.emptyDirSync(DIST_DIR);
fs.copySync(PUBLIC_DIR, DIST_DIR);

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: `${DIST_DIR}/bundle.js`
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write(`${DIST_DIR}/bundle.css`);
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    commonjs(),

    // In dev mode, call `npm run start:dev` once
    // the bundle has been generated
    !production && rollup_start_dev,

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload(DIST_DIR),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};