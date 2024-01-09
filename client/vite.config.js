import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://social-mern-app-three.vercel.app/",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
