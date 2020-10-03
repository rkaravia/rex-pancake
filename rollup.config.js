import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { string } from "rollup-plugin-string";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

const development = {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      dev: true,
      css: (css) => {
        css.write("bundle.css");
      },
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    string({
      include: "**/*.tsv",
    }),
    serve(),
    !production && livereload("public"),
  ],
  watch: {
    clearScreen: false,
  },
};

const serverSideRendering = {
  input: "src/App.svelte",
  output: {
    exports: "auto",
    file: "build/ssr/App.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    svelte({
      generate: "ssr",
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    string({
      include: "**/*.tsv",
    }),
  ],
};

export default production ? serverSideRendering : development;
