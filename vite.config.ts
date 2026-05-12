import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: ["quiettrails.onrender.com", "project-problam-2.onrender.com"],
    },
    preview: {
      host: "0.0.0.0",
      allowedHosts: ["quiettrails.onrender.com", "project-problam-2.onrender.com"],
    },
  },
});