import { courseOf, type SlideDeck } from '../data/chapterSlides';
import { previewUrl } from './slidePreviews';

// The slide pictures of one or more decks, in the order of the slide show: one picture for each click of an animation. They
// open on a page of their own, one picture to a sheet, and the print dialog starts, so the student prints them or saves them as
// a PDF and writes on them. Only the pictures are used; the .pptx file is never linked here.

const pad = (n: number) => String(n).padStart(2, '0');
const folderOf = (deck: SlideDeck) => deck.file.replace(/\.pptx$/, '');
const absolute = (path: string) => new URL(path, window.location.href).href;

type Manifest = { slides: Array<{ slide: number; steps: number }> };

// notebook: each slide is printed once, complete, beside ruled lines for notes, as a printable notebook page.
// Returns false when the browser blocked the new window. The window opens at once, from the click, so the browser does not block it.
export const printDecks = (decks: SlideDeck[], mn: boolean, notebook = false): boolean => {
  const win = window.open('', '_blank');
  if (!win || decks.length === 0) return false;
  win.document.title = decks.map(folderOf).join(' · ');
  win.document.body.style.margin = '0';
  win.document.body.textContent = mn ? 'Слайдууд ачаалж байна…' : 'Loading the slides…';

  Promise.all(
    decks.map(deck =>
      fetch(previewUrl(courseOf(deck), folderOf(deck), 'manifest.json'))
        .then(r => {
          if (!r.ok) throw new Error('no manifest');
          return r.json() as Promise<Manifest>;
        })
        .then(manifest => ({ deck, manifest }))
    )
  )
    .then(loaded => {
      const style = win.document.createElement('style');
      style.textContent = notebook
        ? '@page { margin: 10mm } .deck-title { font: 600 13px sans-serif; color: #334155; margin: 0 0 4mm; } .deck-title.break { page-break-before: always; break-before: page; } .sheet { display: flex; gap: 6mm; align-items: flex-start; page-break-after: always; break-after: page; } .sheet img { flex: none; width: 110mm; border: 1px solid #cbd5e1; } .lines { flex: 1; height: 190mm; background: repeating-linear-gradient(to bottom, transparent 0, transparent 9.6mm, #cbd5e1 9.6mm, #cbd5e1 10mm); }'
        : '@page { margin: 8mm } .deck-title { font: 600 13px sans-serif; color: #334155; margin: 0 0 3mm; } .deck-title.break { page-break-before: always; break-before: page; } img { display: block; width: 100%; page-break-after: always; break-after: page; }';
      win.document.head.appendChild(style);
      win.document.body.textContent = '';
      const loads: Promise<unknown>[] = [];
      loaded.forEach(({ deck, manifest }, deckIndex) => {
        const course = courseOf(deck);
        const folder = folderOf(deck);
        // Each deck starts on a new sheet after the first, under its title
        const title = win.document.createElement('div');
        title.className = deckIndex > 0 ? 'deck-title break' : 'deck-title';
        title.textContent = `${deck.deckNo} · ${mn ? deck.titleMn : deck.titleEn}`;
        win.document.body.appendChild(title);
        for (const s of manifest.slides) {
          // A notebook page shows the slide complete, which is its last picture; the pictures print one for each click
          const steps = notebook ? [Math.max(s.steps - 1, 0)] : Array.from({ length: s.steps }, (_, i) => i);
          for (const step of steps) {
            const img = win.document.createElement('img');
            loads.push(new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve;
            }));
            img.src = absolute(previewUrl(course, folder, `${pad(s.slide)}-${pad(step)}.jpg`));
            if (notebook) {
              const sheet = win.document.createElement('div');
              sheet.className = 'sheet';
              const lines = win.document.createElement('div');
              lines.className = 'lines';
              sheet.append(img, lines);
              win.document.body.appendChild(sheet);
            } else {
              win.document.body.appendChild(img);
            }
          }
        }
      });
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

// One deck, as a printable page or a notebook page
export const printDeck = (deck: SlideDeck, mn: boolean, notebook = false): boolean => printDecks([deck], mn, notebook);
