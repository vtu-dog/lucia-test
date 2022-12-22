import { sveltekit } from "@sveltejs/kit/vite";
import { resolve } from "path";

/** @type {import('vite').UserConfig} */
const config = {
  resolve: {
    alias: {
      $components: resolve("./src/components"),
      $models: resolve("./src/models"),
      $common: resolve("./src/common"),
      $stores: resolve("./src/stores"),
    },
  },
  plugins: [sveltekit()],
};

export default config;
