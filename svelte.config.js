import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

import betterLogging from "better-logging";
betterLogging(console, { saveToFile: "./runtime/logs/debug.log" });

console.logLevel = 3;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
  },
};

export default config;
