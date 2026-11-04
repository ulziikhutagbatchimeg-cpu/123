import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// The slide pictures are read from Firebase Storage after sign-in (see src/lib/slidePreviews.ts), so the built site
// carries none of the public/slides folder: it is removed from the build after Vite copies it.
const noSlidePictures = (): Plugin => ({
  name: 'no-slide-pictures',
  apply: 'build',
  closeBundle() {
    fs.rmSync(path.resolve(__dirname, 'dist', 'slides'), {recursive: true, force: true});
  },
});

export default defineConfig(() => {
  return {
    // Relative asset paths so the build also works under GitHub Pages (/123/).
    base: './',
    plugins: [react(), tailwindcss(), noSlidePictures()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
