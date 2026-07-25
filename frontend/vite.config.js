import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/saavn": {
        target: "https://saavn.sumit.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/saavn/, ""),
      },
    },
  },
});
