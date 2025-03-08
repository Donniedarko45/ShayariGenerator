import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@google/generative-ai']
    }
  },
  ssr: {
    noExternal: ['@google/generative-ai'], // Ensure Vercel bundles it properly
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ['@google/generative-ai'],
    exclude: ["lucide-react"],
  },
});
