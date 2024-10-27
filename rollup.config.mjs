import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist", // Use output.dir instead of output.file
    format: "esm", // Can specify esm (ES Module) or cjs (CommonJS) here
    sourcemap: true,
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist", // Ensures TypeScript declarations go to the same directory
    }),
  ],
  external: ["react", "react-dom"],
};