// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // <https://vitejs.dev/config/>
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: true,
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    // To ustawia fallback na index.html, co jest wymagane dla aplikacji SPA
    historyApiFallback: true,
  }
});
