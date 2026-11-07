import React, { useEffect, useRef, useState } from 'react';
import { Download, Eraser, Trash2 } from 'lucide-react';

// A whiteboard beside the slides: the student draws or writes with a pen in three colours, or erases. The drawing is kept on
// this browser for the slide part it sits beside, so it is still there the next time the lesson opens. Nothing is sent anywhere.
const COLOURS = [
  { value: '#0f172a', en: 'Black', mn: 'Хар' },
  { value: '#1d4ed8', en: 'Blue', mn: 'Цэнхэр' },
  { value: '#dc2626', en: 'Red', mn: 'Улаан' }
];

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

export const Whiteboard: React.FC<{ storageKey: string; mn: boolean }> = ({ storageKey, mn }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colour, setColour] = useState(COLOURS[0].value);
  const [erasing, setErasing] = useState(false);
  // The point the pen is at while a stroke is being drawn
  const stroke = useRef<{ x: number; y: number } | null>(null);
  // The drawing as last saved, so it can be drawn again when the canvas changes size
  const saved = useRef<string | null>(null);

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

  // Loads the drawing of this slide part, and keeps the canvas at the size it is shown at
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saved.current = readBoard(storageKey);
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
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

  // The pen's position on the canvas, in its own pixels
  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const lineStyle = (ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio || 1;
    ctx.strokeStyle = erasing ? '#ffffff' : colour;
    ctx.fillStyle = erasing ? '#ffffff' : colour;
    ctx.lineWidth = (erasing ? 22 : 3) * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.setPointerCapture(e.pointerId);
    const p = point(e);
    stroke.current = p;
    // A single tap leaves a dot
    lineStyle(ctx);
    ctx.beginPath();
    ctx.arc(p.x, p.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !stroke.current) return;
    const p = point(e);
    lineStyle(ctx);
    ctx.beginPath();
    ctx.moveTo(stroke.current.x, stroke.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    stroke.current = p;
  };

  const onUp = () => {
    const canvas = canvasRef.current;
    if (!canvas || !stroke.current) return;
    stroke.current = null;
    const data = canvas.toDataURL('image/png');
    saved.current = data;
    writeBoard(storageKey, data);
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

  const clear = () => {
    if (!window.confirm(mn ? 'Самбарыг бүтнээр нь арилгах уу?' : 'Clear the whole whiteboard?')) return;
    saved.current = null;
    writeBoard(storageKey, null);
    paint(null);
  };

  const pen = (on: boolean) =>
    `px-2 py-1 rounded-lg border text-[11px] font-bold ${
      on ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
    }`;

  return (
    <div className="flex flex-col gap-2 min-h-[220px] p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          {mn ? 'Самбар' : 'Whiteboard'}
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {COLOURS.map(c => (
            <button
              key={c.value}
              type="button"
              aria-label={mn ? c.mn : c.en}
              aria-pressed={!erasing && colour === c.value}
              onClick={() => {
                setColour(c.value);
                setErasing(false);
              }}
              className={`w-5 h-5 rounded-full border-2 ${
                !erasing && colour === c.value ? 'border-violet-600 ring-2 ring-violet-300' : 'border-slate-300 dark:border-slate-600'
              }`}
              style={{ backgroundColor: c.value }}
            />
          ))}
          <button type="button" onClick={() => setErasing(v => !v)} aria-pressed={erasing} className={pen(erasing)}>
            <Eraser className="inline w-3 h-3 mr-1" aria-hidden="true" />
            {mn ? 'Арилгагч' : 'Eraser'}
          </button>
          <button type="button" onClick={download} className={pen(false)}>
            <Download className="inline w-3 h-3 mr-1" aria-hidden="true" />
            {mn ? 'Татах (PNG)' : 'Download (PNG)'}
          </button>
          <button type="button" onClick={clear} className={pen(false)}>
            <Trash2 className="inline w-3 h-3 mr-1" aria-hidden="true" />
            {mn ? 'Цэвэрлэх' : 'Clear'}
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
        style={{ touchAction: 'none' }}
        className="flex-1 min-h-[160px] w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white cursor-crosshair"
      />
    </div>
  );
};
