import React, { useEffect, useRef, useState } from 'react';
import { Download, Eraser, Paintbrush, Pen, Trash2, Type } from 'lucide-react';

// A whiteboard beside the slides. The student writes with a pen (үзэг), colours with a coloured pencil (будагч харандаа), types
// text in English or Mongolian (текст), or erases. The drawing is kept on this browser for the slide part it sits beside, so it
// is still there the next time the lesson opens. Nothing is sent anywhere.
type Tool = 'pen' | 'pencil' | 'eraser' | 'text';

const COLOURS = [
  { value: '#0f172a', en: 'Black', mn: 'Хар' },
  { value: '#1d4ed8', en: 'Blue', mn: 'Цэнхэр' },
  { value: '#dc2626', en: 'Red', mn: 'Улаан' },
  { value: '#16a34a', en: 'Green', mn: 'Ногоон' }
];

// The stroke width of each tool, in CSS pixels
const WIDTH: Record<Tool, number> = { pen: 2.5, pencil: 8, eraser: 22, text: 0 };

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
  const [tool, setTool] = useState<Tool>('pen');
  const [colour, setColour] = useState(COLOURS[0].value);
  // The text to place on the board with the text tool; it can be English or Mongolian
  const [text, setText] = useState('');
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

  // The colour, width and transparency of the current tool. A coloured pencil is a wide stroke that shows the paper through.
  const lineStyle = (ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio || 1;
    const erasing = tool === 'eraser';
    ctx.strokeStyle = erasing ? '#ffffff' : colour;
    ctx.fillStyle = erasing ? '#ffffff' : colour;
    ctx.globalAlpha = tool === 'pencil' ? 0.45 : 1;
    ctx.lineWidth = WIDTH[tool] * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  // Saves the drawing as it is now, for this slide part
  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL('image/png');
    saved.current = data;
    writeBoard(storageKey, data);
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const p = point(e);
    // The text tool places the typed text where the student taps
    if (tool === 'text') {
      const words = text.trim();
      if (!words) return;
      const dpr = window.devicePixelRatio || 1;
      ctx.globalAlpha = 1;
      ctx.fillStyle = colour;
      ctx.font = `${Math.round(18 * dpr)}px system-ui, "Segoe UI", sans-serif`;
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(words, p.x, p.y);
      save();
      return;
    }
    canvas.setPointerCapture(e.pointerId);
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
    if (!stroke.current) return;
    stroke.current = null;
    save();
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

  const pill = (on: boolean) =>
    `inline-flex items-center px-2 py-1 rounded-lg border text-[11px] font-bold ${
      on ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
    }`;

  const tools: { id: Tool; icon: React.ReactNode; mn: string; en: string }[] = [
    { id: 'pen', icon: <Pen className="inline w-3 h-3 mr-1" aria-hidden="true" />, mn: 'Үзэг', en: 'Pen' },
    { id: 'pencil', icon: <Paintbrush className="inline w-3 h-3 mr-1" aria-hidden="true" />, mn: 'Будагч харандаа', en: 'Coloured pencil' },
    { id: 'text', icon: <Type className="inline w-3 h-3 mr-1" aria-hidden="true" />, mn: 'Текст', en: 'Text' },
    { id: 'eraser', icon: <Eraser className="inline w-3 h-3 mr-1" aria-hidden="true" />, mn: 'Арилгагч', en: 'Eraser' }
  ];

  return (
    <div className="flex flex-col gap-2 min-h-[220px] p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          {mn ? 'Самбар' : 'Whiteboard'}
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {tools.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTool(t.id)}
              aria-pressed={tool === t.id}
              className={pill(tool === t.id)}
            >
              {t.icon}
              {mn ? t.mn : t.en}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {COLOURS.map(c => (
            <button
              key={c.value}
              type="button"
              aria-label={mn ? c.mn : c.en}
              aria-pressed={tool !== 'eraser' && colour === c.value}
              onClick={() => {
                setColour(c.value);
                if (tool === 'eraser') setTool('pen');
              }}
              className={`w-5 h-5 rounded-full border-2 ${
                tool !== 'eraser' && colour === c.value ? 'border-violet-600 ring-2 ring-violet-300' : 'border-slate-300 dark:border-slate-600'
              }`}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
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
      {tool === 'text' && (
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={mn ? 'Энд бичнэ (англи эсвэл монгол), дараа нь самбар дээр дарна' : 'Type here (English or Mongolian), then tap the board'}
          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white"
        />
      )}
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
