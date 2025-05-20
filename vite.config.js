import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "mfe2",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mfe-entry.js",
      },
      shared: ["vue"],
    }),
  ],
  server: {
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    port: 5002,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: "dist",
    assetsDir: "",
  },
});
