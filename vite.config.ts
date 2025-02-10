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
      '/api': {
        target: 'https://open.larksuite.com/open-apis/docx/v1/documents',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/tenant-api': {
        target: 'https://open.larksuite.com/open-apis/auth/v3',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/tenant-api/, ''),
      },
    },


  }
});



