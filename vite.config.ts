import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// The slide-picture folder of each course (public/slides/<folder>)
const SLIDE_FOLDER: Record<string, string> = {igcse: 'igcse-0620', as: 'alevel-9701', a: 'alevel-9701'};

// A site locked to one course (VITE_SITE_COURSE) ships only that course's slide pictures, so each site stays small
const courseSlides = (): Plugin => ({
  name: 'course-slides',
  apply: 'build',
  closeBundle() {
    const site = process.env.VITE_SITE_COURSE;
    if (!site || !SLIDE_FOLDER[site]) return;
    for (const folder of new Set(Object.values(SLIDE_FOLDER))) {
      if (folder !== SLIDE_FOLDER[site]) {
        fs.rmSync(path.resolve(__dirname, 'dist', 'slides', folder), {recursive: true, force: true});
      }
    }
  },
});

export default defineConfig(() => {
  return {
    // Relative asset paths so the build also works under GitHub Pages (/123/).
    base: './',
    plugins: [react(), tailwindcss(), courseSlides()],
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
