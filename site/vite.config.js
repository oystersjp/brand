import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import tsconfigPaths from 'vite-tsconfig-paths'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [tsconfigPaths(), svgLoader()],
  base: '/brand',
})
