import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../server/public",
    assetsDir:"./"
  },
  plugins: [react(), tailwindcss()],
});
