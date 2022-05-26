import del from "rollup-plugin-delete";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";
import analyze from "rollup-plugin-analyzer";
const packageJson = require("./package.json");

const plugins = [
  del({ targets: "dist/*", runOnce: true }),
  typescript({ tsconfig: "./tsconfig.json" }),
  external(),
  resolve(),
  replace({ __VERSION__: `'${pkg.version}'` }),
  analyze({ summaryOnly: true }),
];
const input = "src/index.ts";
export default [
  {
    input,
    output: [
      {
        name: packageJson.name,
        file: "./dist/auth0-verify-email.js",
        format: "umd",
        sourcemap: true,
      },
    ],
    plugins: [...plugins],
  },
  {
    input,
    output: [
      {
        name: packageJson.name,
        file: "./dist/auth0-verify-email.min.js",
        format: "umd",
        sourcemap: true,
      },
    ],
    plugins: [...plugins, terser()],
  },
  {
    input,
    output: {
      name: packageJson.name,
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
  },
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
  },
];
