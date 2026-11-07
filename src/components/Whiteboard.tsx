import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Circle, Crop, Download, Eraser, Highlighter, Minus, Paintbrush, Pen, Redo2, Square, Trash2, Type, Undo2, ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react';

// A whiteboard beside the slides, for the student's own notes. Tools: a pen (үзэг), a coloured pencil (будагч харандаа), a
// highlighter (маркер), typed text in English or Mongolian (текст), a line, an arrow, a rectangle and an ellipse, crop (кадрлах),
// and the eraser. Undo and redo, download as a picture, and clear. The drawing is kept on this browser for the slide part it sits
// beside, so it is still there the next time the lesson opens. Nothing is sent anywhere.
type Tool = 'pen' | 'pencil' | 'highlighter' | 'text' | 'line' | 'arrow' | 'rect' | 'ellipse' | 'crop' | 'eraser';
type Point = { x: number; y: number };
type Box = { x: number; y: number; w: number; h: number };

const COLOURS = [
  { value: '#0f172a', en: 'Black', mn: 'Хар' },
  { value: '#1d4ed8', en: 'Blue', mn: 'Цэнхэр' },
  { value: '#dc2626', en: 'Red', mn: 'Улаан' },
  { value: '#16a34a', en: 'Green', mn: 'Ногоон' }
];

// The tools in the order of the toolbar, with their icons
const TOOLS: { id: Tool; icon: LucideIcon; mn: string; en: string }[] = [
  { id: 'pen', icon: Pen, mn: 'Үзэг', en: 'Pen' },
  { id: 'pencil', icon: Paintbrush, mn: 'Будагч харандаа', en: 'Coloured pencil' },
  { id: 'highlighter', icon: Highlighter, mn: 'Маркер', en: 'Highlighter' },
  { id: 'text', icon: Type, mn: 'Текст', en: 'Text' },
  { id: 'line', icon: Minus, mn: 'Шугам', en: 'Line' },
  { id: 'arrow', icon: ArrowUpRight, mn: 'Сум', en: 'Arrow' },
  { id: 'rect', icon: Square, mn: 'Дөрвөлжин', en: 'Rectangle' },
  { id: 'ellipse', icon: Circle, mn: 'Тойрог', en: 'Ellipse' },
  { id: 'crop', icon: Crop, mn: 'Кадрлах', en: 'Crop' },
  { id: 'eraser', icon: Eraser, mn: 'Арилгагч', en: 'Eraser' }
];

// The symbols a chemistry lesson uses most: charges, indices, arrows, state symbols and Greek letters. A tap adds one to the text.
const SYMBOL_GROUPS: { mn: string; en: string; symbols: string[] }[] = [
  { mn: 'Сум', en: 'Arrows', symbols: ['→', '⇌', '↑', '↓'] },
  { mn: 'Цэнэг', en: 'Charges', symbols: ['⁺', '⁻', '²⁺', '²⁻', '³⁺', '³⁻'] },
  { mn: 'Индекс', en: 'Subscripts', symbols: ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'] },
  { mn: 'Зэрэг', en: 'Superscripts', symbols: ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'] },
  { mn: 'Төлөв', en: 'States', symbols: ['(s)', '(l)', '(g)', '(aq)'] },
  { mn: 'Грек, бусад', en: 'Greek and others', symbols: ['Δ', 'δ', 'α', 'β', 'λ', 'π', '°', '±', '×', '≈', '≥', '≤'] }
];

// How many earlier states the undo keeps
const HISTORY = 40;

const readBoard = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeBoard = (key: string, data: string | null) => {
  try {
    if (data === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, data);
  } catch {
    // Storage can be blocked or full: the drawing then lasts only for this visit
  }
};

const dpr = () => window.devicePixelRatio || 1;

// A formula written the way a teacher types it: digits after a symbol become subscripts (H2O → H₂O), a charge becomes a
// superscript (Fe3+ → Fe³⁺, SO4^2- → SO₄²⁻), and -> and <=> become arrows. Anything else is kept as typed.
const SUBSCRIPT: Record<string, string> = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻'
};
const toChemistry = (s: string): string =>
  s
    .replace(/<=>|<->/g, '⇌')
    .replace(/->/g, '→')
    // x^2- written with a caret
    .replace(/\^([0-9+-]+)/g, (_, t: string) => [...t].map(c => SUPERSCRIPT[c] ?? c).join(''))
    // Fe3+ and Cl- : the charge after a symbol
    .replace(/([A-Za-z)\]])(\d*)([+-])(?![A-Za-z0-9])/g, (_, sym: string, n: string, sign: string) =>
      sym + [...n].map(d => SUPERSCRIPT[d]).join('') + SUPERSCRIPT[sign]
    )
    // H2O, Na2CO3, CuSO4 : digits after a symbol
    .replace(/([A-Za-z)\]])(\d+)/g, (_, sym: string, n: string) => sym + [...n].map(d => SUBSCRIPT[d]).join(''));

// The colour and width of a tool. A coloured pencil is a wide soft stroke, a highlighter a wide translucent one.
const style = (ctx: CanvasRenderingContext2D, tool: Tool, colour: string) => {
  const d = dpr();
  const erase = tool === 'eraser';
  const marker = tool === 'highlighter';
  ctx.strokeStyle = erase ? '#ffffff' : marker ? '#facc15' : colour;
  ctx.fillStyle = erase ? '#ffffff' : marker ? '#facc15' : colour;
  ctx.globalAlpha = tool === 'pencil' ? 0.45 : marker ? 0.4 : 1;
  ctx.lineWidth = (erase ? 22 : marker ? 16 : tool === 'pencil' ? 8 : 2.5) * d;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
};

// Draws a line, an arrow, a rectangle or an ellipse from one point to another
const drawShape = (ctx: CanvasRenderingContext2D, tool: Tool, a: Point, b: Point) => {
  ctx.beginPath();
  if (tool === 'line' || tool === 'arrow') {
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    if (tool === 'arrow') {
      const angle = Math.atan2(b.y - a.y, b.x - a.x);
      const head = 14 * dpr();
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x - head * Math.cos(angle - Math.PI / 6), b.y - head * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x - head * Math.cos(angle + Math.PI / 6), b.y - head * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
    }
  } else if (tool === 'rect') {
    ctx.strokeRect(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(b.x - a.x), Math.abs(b.y - a.y));
  } else if (tool === 'ellipse') {
    ctx.ellipse((a.x + b.x) / 2, (a.y + b.y) / 2, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 2, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
};

// The dashed frame of the crop
const drawCropFrame = (ctx: CanvasRenderingContext2D, box: Box) => {
  const d = dpr();
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 2 * d;
  ctx.setLineDash([6 * d, 4 * d]);
  ctx.strokeRect(box.x, box.y, box.w, box.h);
  ctx.restore();
};

const boxOf = (a: Point, b: Point): Box => ({
  x: Math.min(a.x, b.x),
  y: Math.min(a.y, b.y),
  w: Math.abs(b.x - a.x),
  h: Math.abs(b.y - a.y)
});

export const Whiteboard: React.FC<{ storageKey: string; mn: boolean }> = ({ storageKey, mn }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>('pen');
  const [colour, setColour] = useState(COLOURS[0].value);
  // The text to place on the board with the text tool; it can be English or Mongolian
  const [text, setText] = useState('');
  // The area chosen with the crop tool, in the canvas's own pixels, until it is applied or cancelled
  const [cropBox, setCropBox] = useState<Box | null>(null);
  // The tool rows can be folded away to leave more of the board; a crop in progress keeps them open
  const [folded, setFolded] = useState(false);
  const hideTools = folded && !cropBox;
  // Re-renders the buttons when the undo or redo history changes
  const [, setTick] = useState(0);
  const bump = () => setTick(t => t + 1);
  // The drawing as last saved, so it can be drawn again when the canvas changes size
  const saved = useRef<string | null>(null);
  // Earlier and later states of the board, for undo and redo ('' is an empty board)
  const past = useRef<string[]>([]);
  const future = useRef<string[]>([]);
  // The gesture in progress: a stroke, or a shape or crop drawn from a start point over the board as it was
  const drag = useRef<{ tool: Tool; start: Point; last: Point; base: ImageData | null; before: string | null } | null>(null);
  // The board without the crop frame, kept while a crop is chosen
  const cropBase = useRef<ImageData | null>(null);

  // Paints the white board, then the saved drawing on it, at the canvas's current size
  const paint = (data: string | null) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!data) return;
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.src = data;
  };

  // Keeps the saved board as the current state: on the canvas, in the browser, and as the state an undo returns to
  const setBoard = (data: string | null) => {
    saved.current = data;
    writeBoard(storageKey, data);
    paint(data);
  };

  // Records a state the board had before a change, so undo can return to it; a new change clears the redo states
  const record = (before: string | null) => {
    past.current.push(before ?? '');
    if (past.current.length > HISTORY) past.current.shift();
    future.current = [];
    bump();
  };

  // Saves the drawing as it is now, for this slide part
  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL('image/png');
    saved.current = data;
    writeBoard(storageKey, data);
  };

  // Loads the drawing of this slide part, and keeps the canvas at the size it is shown at
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saved.current = readBoard(storageKey);
    past.current = [];
    future.current = [];
    cropBase.current = null;
    setCropBox(null);
    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr()));
      const h = Math.max(1, Math.round(rect.height * dpr()));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      paint(saved.current);
    };
    fit();
    paint(saved.current);
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [storageKey]);

  // The pointer's position on the canvas, in its own pixels
  const point = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  // Drops a chosen crop, leaving the board as it was
  const dropCrop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && cropBase.current) ctx.putImageData(cropBase.current, 0, 0);
    cropBase.current = null;
    setCropBox(null);
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const p = point(e);
    // Starting something new drops a crop that was only chosen
    if (cropBox) dropCrop();
    // The text tool places the typed text where the student taps
    if (tool === 'text') {
      const words = toChemistry(text.trim());
      if (!words) return;
      const before = saved.current;
      ctx.globalAlpha = 1;
      ctx.fillStyle = colour;
      ctx.font = `${Math.round(18 * dpr())}px system-ui, "Segoe UI", sans-serif`;
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(words, p.x, p.y);
      record(before);
      save();
      return;
    }
    canvas.setPointerCapture(e.pointerId);
    const before = saved.current;
    if (tool === 'crop' || tool === 'line' || tool === 'arrow' || tool === 'rect' || tool === 'ellipse') {
      drag.current = { tool, start: p, last: p, base: ctx.getImageData(0, 0, canvas.width, canvas.height), before };
      return;
    }
    drag.current = { tool, start: p, last: p, base: null, before };
    style(ctx, tool, colour);
    // A single tap leaves a dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = drag.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!d || !canvas || !ctx) return;
    const p = point(e);
    if (d.base) {
      // A shape or a crop frame is drawn again from the board as it was, so it follows the pointer
      ctx.putImageData(d.base, 0, 0);
      if (d.tool === 'crop') {
        drawCropFrame(ctx, boxOf(d.start, p));
      } else {
        style(ctx, 'pen', colour);
        drawShape(ctx, d.tool, d.start, p);
      }
    } else {
      style(ctx, d.tool, colour);
      ctx.beginPath();
      ctx.moveTo(d.last.x, d.last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    d.last = p;
  };

  const onUp = () => {
    const d = drag.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    drag.current = null;
    if (!d || !canvas || !ctx) return;
    if (d.tool === 'crop') {
      // The crop is only chosen here: the frame stays until it is applied or dropped
      const box = boxOf(d.start, d.last);
      if (d.base && box.w >= 6 && box.h >= 6) {
        cropBase.current = d.base;
        setCropBox(box);
      } else if (d.base) {
        ctx.putImageData(d.base, 0, 0);
      }
      return;
    }
    if (d.base) {
      // A shape is drawn where the pointer finished, over the board as it was
      ctx.putImageData(d.base, 0, 0);
      style(ctx, 'pen', colour);
      drawShape(ctx, d.tool, d.start, d.last);
    }
    record(d.before);
    save();
  };

  // Applies the chosen crop: the chosen part fills the board, with its proportions kept
  const applyCrop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !cropBox) return;
    if (cropBase.current) ctx.putImageData(cropBase.current, 0, 0);
    const part = document.createElement('canvas');
    part.width = Math.max(1, Math.round(cropBox.w));
    part.height = Math.max(1, Math.round(cropBox.h));
    part.getContext('2d')?.drawImage(canvas, cropBox.x, cropBox.y, cropBox.w, cropBox.h, 0, 0, part.width, part.height);
    const before = saved.current;
    const scale = Math.min(canvas.width / part.width, canvas.height / part.height);
    const w = part.width * scale;
    const h = part.height * scale;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(part, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    cropBase.current = null;
    setCropBox(null);
    record(before);
    save();
  };

  // Steps back to the board before the last change, or forward again after an undo
  const step = (from: { current: string[] }, to: { current: string[] }) => {
    const next = from.current.pop();
    if (next === undefined) return;
    to.current.push(saved.current ?? '');
    dropCrop();
    setBoard(next || null);
    bump();
  };

  // Saves the drawing to the student's own computer as a picture, so the student keeps a copy of it
  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'whiteboard.png';
    link.click();
  };

  // Clears the whole board at once. There is no confirmation dialog, which some browsers block; Undo brings the drawing back.
  const clear = () => {
    if (saved.current === null) return;
    dropCrop();
    record(saved.current);
    setBoard(null);
  };

  const pill = (on: boolean) =>
    `inline-flex items-center px-2 py-1 rounded-lg border text-[11px] font-bold disabled:opacity-40 ${
      on ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
    }`;

  return (
    <div className="flex flex-col gap-2 min-h-[220px] p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          {mn ? 'Самбар' : 'Whiteboard'}
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={() => step(past, future)} disabled={past.current.length === 0} className={pill(false)}>
            <Undo2 className="inline w-3 h-3 mr-1" aria-hidden="true" />
            {mn ? 'Буцаах' : 'Undo'}
          </button>
          <button type="button" onClick={() => step(future, past)} disabled={future.current.length === 0} className={pill(false)}>
            <Redo2 className="inline w-3 h-3 mr-1" aria-hidden="true" />
            {mn ? 'Дахих' : 'Redo'}
          </button>
          <button type="button" onClick={() => setFolded(f => !f)} aria-expanded={!folded} className={pill(false)}>
            {folded ? <ChevronDown className="inline w-3 h-3 mr-1" aria-hidden="true" /> : <ChevronUp className="inline w-3 h-3 mr-1" aria-hidden="true" />}
            {mn ? 'Хэрэгслүүд' : 'Tools'}
          </button>
          <button type="button" onClick={download} className={pill(false)}>
            <Download className="inline w-3 h-3 mr-1" aria-hidden="true" />
            {mn ? 'Татах (PNG)' : 'Download (PNG)'}
          </button>
          <button type="button" onClick={clear} className={pill(false)}>
            <Trash2 className="inline w-3 h-3 mr-1" aria-hidden="true" />
            {mn ? 'Цэвэрлэх' : 'Clear'}
          </button>
        </div>
      </div>
      {!hideTools && (
      <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {TOOLS.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} type="button" onClick={() => setTool(t.id)} aria-pressed={tool === t.id} className={pill(tool === t.id)}>
                <Icon className="inline w-3 h-3 mr-1" aria-hidden="true" />
                {mn ? t.mn : t.en}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {COLOURS.map(c => (
            <button
              key={c.value}
              type="button"
              aria-label={mn ? c.mn : c.en}
              aria-pressed={colour === c.value}
              onClick={() => {
                setColour(c.value);
                if (tool === 'eraser') setTool('pen');
              }}
              className={`w-5 h-5 rounded-full border-2 ${
                colour === c.value ? 'border-violet-600 ring-2 ring-violet-300' : 'border-slate-300 dark:border-slate-600'
              }`}
              style={{ backgroundColor: c.value }}
            />
          ))}
          {cropBox && (
            <>
              <button
                type="button"
                onClick={applyCrop}
                className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-black"
              >
                {mn ? 'Кадрлах' : 'Apply crop'}
              </button>
              <button type="button" onClick={dropCrop} className={pill(false)}>
                {mn ? 'Болих' : 'Cancel'}
              </button>
            </>
          )}
        </div>
      </div>
      {tool === 'crop' && !cropBox && (
        <p className="text-[11px] text-slate-600 dark:text-slate-300">
          {mn ? 'Самбар дээр хүрээ зурна, дараа нь «Кадрлах» дарна.' : 'Drag a frame on the board, then press Crop.'}
        </p>
      )}
      {tool === 'text' && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{mn ? 'Химийн тэмдэгт (дарж нэмнэ)' : 'Chemistry symbols (tap to add)'}</div>
          {SYMBOL_GROUPS.map(g => (
            <div key={g.en} className="flex flex-wrap items-center gap-1">
              <span className="w-24 shrink-0 text-[10px] font-bold text-slate-500 dark:text-slate-400">{mn ? g.mn : g.en}</span>
              {g.symbols.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setText(t => t + s)}
                  className="min-w-[1.9rem] px-1.5 py-0.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-violet-500"
                >
                  {s}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
      {tool === 'text' && (
        <div className="space-y-1.5">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={
              mn
                ? 'Энд бичнэ (англи эсвэл монгол), дараа нь самбар дээр дарна. Томъёо: H2O, Fe3+, SO4^2-, ->'
                : 'Type here (English or Mongolian), then tap the board. Formulas: H2O, Fe3+, SO4^2-, ->'
            }
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white"
          />
          {text.trim() !== '' && toChemistry(text.trim()) !== text.trim() && (
            <p className="text-xs text-slate-700 dark:text-slate-200">
              {mn ? 'Самбар дээр харагдах хэлбэр: ' : 'Shows on the board as: '}
              <span className="font-bold">{toChemistry(text.trim())}</span>
            </p>
          )}
        </div>
      )}
      </>
      )}
      <canvas
        ref={canvasRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ touchAction: 'none' }}
        className="flex-1 min-h-[160px] w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white cursor-crosshair"
      />
    </div>
  );
};
