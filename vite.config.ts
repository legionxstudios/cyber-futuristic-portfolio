import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import ssr from "vite-plugin-ssr/plugin";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ssr({
      prerender: true
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      // Changed from @ to src to follow vite-plugin-ssr recommendations
      "src": path.resolve(__dirname, "./src"),
    },
  },
}));