import { courseOf, type SlideDeck } from '../data/chapterSlides';
import { previewUrl } from './slidePreviews';

// The slide pictures of one deck, in the order of the slide show: one picture for each click of an animation. They open on a
// page of their own, one picture to a sheet, and the print dialog starts, so the student prints them or saves them as a PDF
// and writes on them. Only the pictures are used; the .pptx file is never linked here.

const pad = (n: number) => String(n).padStart(2, '0');
const folderOf = (deck: SlideDeck) => deck.file.replace(/\.pptx$/, '');
const absolute = (path: string) => new URL(path, window.location.href).href;

type Manifest = { slides: Array<{ slide: number; steps: number }> };

// Returns false when the browser blocked the new window. The window opens at once, from the click, so the browser does not block it.
export const printDeck = (deck: SlideDeck, mn: boolean): boolean => {
  const win = window.open('', '_blank');
  if (!win) return false;
  const course = courseOf(deck);
  const folder = folderOf(deck);
  win.document.title = folder;
  win.document.body.style.margin = '0';
  win.document.body.textContent = mn ? 'Слайдууд ачаалж байна…' : 'Loading the slides…';

  fetch(previewUrl(course, folder, 'manifest.json'))
    .then(r => {
      if (!r.ok) throw new Error('no manifest');
      return r.json() as Promise<Manifest>;
    })
    .then(manifest => {
      const style = win.document.createElement('style');
      style.textContent = '@page { margin: 8mm } img { display: block; width: 100%; page-break-after: always; break-after: page; }';
      win.document.head.appendChild(style);
      win.document.body.textContent = '';
      const loads: Promise<unknown>[] = [];
      for (const s of manifest.slides) {
        for (let step = 0; step < s.steps; step++) {
          const img = win.document.createElement('img');
          loads.push(new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          }));
          img.src = absolute(previewUrl(course, folder, `${pad(s.slide)}-${pad(step)}.jpg`));
          win.document.body.appendChild(img);
        }
      }
      return Promise.all(loads);
    })
    .then(() => {
      win.focus();
      win.print();
    })
    .catch(() => {
      win.document.body.textContent = mn ? 'Слайд олдсонгүй.' : 'The slides could not be loaded.';
    });
  return true;
};
