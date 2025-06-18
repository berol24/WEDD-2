import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()]})



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react' // ou vue, selon ton projet
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt'],
//       manifest: {
//         name: 'Nom de ton application',
//         short_name: 'App',
//         description: 'Une application web progressive',
//         theme_color: '#ffffff',
//         background_color: '#ffffff',
//         display: 'standalone',
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//           },
//         ],
//       },
//     })
//   ],
// })
