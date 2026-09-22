import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          styles: ["styled-components"],
          icons: ["lucide-react", "@heroicons/react"],
          analytics: ["posthog-js"],
          stripe: ["@stripe/stripe-js", "@stripe/react-stripe-js"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
