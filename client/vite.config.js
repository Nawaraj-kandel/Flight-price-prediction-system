import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://model-cockatoo-fair.ngrok-free.app', // Replace with your API base URL
//         changeOrigin: true, // Ensures the host header matches the target
//         rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' prefix from requests
//       },
//     },
//   },
// });
