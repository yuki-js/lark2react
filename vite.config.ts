import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],

  server: {
    proxy: {
      // OLD, SLOPPY, REDUNDANT, USELESS, INCONSISTENT, DUMB, DUPLICATED, STUPID CODE
      // "/api": {
      //   target: "https://open.larksuite.com/open-apis/docx/v1/documents",
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
      // "/ta-api": {
      //   target: "https://open.larksuite.com/open-apis/auth/v3",
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/ta-api/, ""),
      // },
      // "/get_file_api": {
      //   target: "https://open.larksuite.com/open-apis/drive/v1/",
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/get_file_api/, ""),
      // },
      // "/get_comment_api": {
      //   target: "https://open.larksuite.com/open-apis/drive/v1/files/",
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/get_comment_api/, ""),
      // },

      // NEW, CLEANER, MORE CONSISTENT, FAR SMARTER, SPERIOR CODE
      "/proxy": {
        target: "https://open.larksuite.com/open-apis/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    },
  },
});
