import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages project sites: https://<user>.github.io/alertforge/
  // Change or remove this if you deploy to a custom domain / root.
  base: process.env.DEPLOY_BASE ?? '/',
  plugins: [tailwindcss(), svelte()],
})
