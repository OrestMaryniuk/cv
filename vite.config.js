import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import path from "path"; 
import context from "./data.json";

export default defineConfig({
  plugins: [
    handlebars({
      context,
      partialDirectory: path.resolve(__dirname, "src/partials"),
    }),
  ],
  server: {
    open: "/index.html",
    host: true,
  },
});
