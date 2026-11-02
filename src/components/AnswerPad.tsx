import React, { useEffect, useRef, useState } from 'react';
import { Eraser, Maximize2, Minimize2, PenLine, Pencil, Trash2 } from 'lucide-react';

const COLOURS = ['#0f172a', '#dc2626', '#2563eb'] as const;
const BOARD_W = 800;
const BOARD_H = 420;

// Saved on this device only: a blocked or full storage just means the answer is not kept after reload
const readStore = (key: string): string => {
  try {
    return window.localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
};

const writeStore = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage is full or blocked: the learner can still write on the page
  }
};

// A written answer and a whiteboard for one structured question
export const AnswerPad: React.FC<{ questionId: string; mn: boolean }> = ({ questionId, mn }) => {
  const textKey = `chem_answer_${questionId}`;
  const boardKey = `chem_board_${questionId}`;

  const [text, setText] = useState<string>(() => readStore(textKey));
  const [boardOpen, setBoardOpen] = useState<boolean>(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [colour, setColour] = useState<string>(COLOURS[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  // Full screen fills the whole window over the page; Esc or the button puts the board back in place
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  useEffect(() => {
    if (!fullScreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullScreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullScreen]);

  const toggleFullScreen = () => setFullScreen(open => !open);

  // The board starts white, then shows what the learner drew before
  useEffect(() => {
    if (!boardOpen) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const saved = readStore(boardKey);
    if (saved) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = saved;
    }
  }, [boardOpen, boardKey]);

  const pointAt = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * canvas.width) / rect.width,
      y: ((e.clientY - rect.top) * canvas.height) / rect.height
    };
  };

  const startStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPoint.current = pointAt(e);
  };

  const continueStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const from = lastPoint.current;
    const ctx = e.currentTarget.getContext('2d');
    if (!from || !ctx) return;
    const to = pointAt(e);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : colour;
    ctx.lineWidth = tool === 'eraser' ? 28 : 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    lastPoint.current = to;
  };

  const endStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!lastPoint.current) return;
    lastPoint.current = null;
    writeStore(boardKey, e.currentTarget.toDataURL('image/png'));
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    writeStore(boardKey, '');
  };

  const toolButton = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
      active
        ? 'bg-violet-600 border-violet-600 text-white'
        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
    }`;

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
      <label className="block space-y-2">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{mn ? 'Таны хариулт' : 'Your answer'}</span>
        <textarea
          value={text}
          onChange={e => {
            setText(e.target.value);
            writeStore(textKey, e.target.value);
          }}
          rows={4}
          placeholder={mn ? 'Хариултаа энд бичнэ үү' : 'Write your answer here'}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm text-slate-900 dark:text-slate-100 resize-y focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </label>

      <button
        type="button"
        onClick={() => setBoardOpen(open => !open)}
        aria-expanded={boardOpen}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-violet-500 transition-colors"
      >
        <PenLine className="w-4 h-4" />
        {boardOpen ? (mn ? 'Самбарыг хаах' : 'Close whiteboard') : (mn ? 'Цагаан самбар нээх' : 'Open whiteboard')}
      </button>

      {boardOpen && (
        <div className={fullScreen ? 'fixed inset-0 z-50 flex flex-col gap-2 bg-white p-4' : 'space-y-2'}>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setTool('pen')} aria-pressed={tool === 'pen'} className={toolButton(tool === 'pen')}>
              <Pencil className="w-3.5 h-3.5" />
              {mn ? 'Харандаа' : 'Pen'}
            </button>
            <button type="button" onClick={() => setTool('eraser')} aria-pressed={tool === 'eraser'} className={toolButton(tool === 'eraser')}>
              <Eraser className="w-3.5 h-3.5" />
              {mn ? 'Оймс' : 'Eraser'}
            </button>
            {COLOURS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setColour(c);
                  setTool('pen');
                }}
                aria-label={mn ? 'Өнгө сонгох' : 'Choose colour'}
                style={{ backgroundColor: c }}
                className={`h-6 w-6 rounded-full border-2 ${colour === c && tool === 'pen' ? 'border-emerald-500' : 'border-white dark:border-slate-900'}`}
              />
            ))}
            <button
              type="button"
              onClick={clearBoard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-rose-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {mn ? 'Цэвэрлэх' : 'Clear'}
            </button>
            <button
              type="button"
              onClick={toggleFullScreen}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-violet-500 transition-colors"
            >
              {fullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              {fullScreen ? (mn ? 'Буцаах' : 'Exit full screen') : (mn ? 'Дэлгэц дүүргэх' : 'Full screen')}
            </button>
          </div>
          <canvas
            ref={canvasRef}
            width={BOARD_W}
            height={BOARD_H}
            onPointerDown={startStroke}
            onPointerMove={continueStroke}
            onPointerUp={endStroke}
            onPointerCancel={endStroke}
            className={`w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white touch-none cursor-crosshair ${fullScreen ? 'min-h-0 flex-1' : 'h-auto'}`}
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {mn ? 'Самбар зөвхөн энэ төхөөрөмж дээр хадгалагдана.' : 'The whiteboard is saved on this device only.'}
          </p>
        </div>
      )}
    </div>
  );
};
