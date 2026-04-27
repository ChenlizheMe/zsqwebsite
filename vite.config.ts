import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves at https://<user>.github.io/<repo>/
// If you rename the repository, update the path below to match.
const repoBase = "/zsqwebsite/";

export default defineConfig({
  plugins: [react()],
  base: process.env.CI === "true" ? repoBase : "/",
});
