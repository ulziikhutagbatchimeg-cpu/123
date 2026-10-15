import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalSim, VideoLesson } from '../data/externalLabResources';
import { ExternalLink, MonitorPlay, CirclePlay, X, Globe } from 'lucide-react';

const PROVIDER_STYLES: Record<ExternalSim['provider'], string> = {
  PhET: 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/60',
  iWant2Study: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
  ChemCollective: 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/60',
  RSC: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
  Ptable: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
};

// --- External simulation cards with an inline player ---

export const ExternalSimGrid: React.FC<{ sims: ExternalSim[] }> = ({ sims }) => {
  const { mode } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);
  const openSim = sims.find(s => s.id === openId);

  if (sims.length === 0) return null;

  const embedSrc = (sim: ExternalSim) =>
    sim.embed ? (mode === 'mn' && sim.embed.mn ? sim.embed.mn : sim.embed.en) : undefined;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {sims.map(sim => {
          const isOpen = sim.id === openId;
          return (
            <div
              key={sim.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 transition-all ${
                isOpen
                  ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500 ring-2 ring-teal-500/30'
                  : 'bg-white dark:bg-slate-950/80 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${PROVIDER_STYLES[sim.provider]}`}>
                    {sim.provider}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 font-semibold">{sim.syllabusRef}</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {mode === 'mn' ? sim.titleMn : sim.titleEn}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {mode === 'mn' ? sim.descMn : sim.descEn}
                </p>
                {mode === 'mn' && sim.embed?.mn && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <Globe className="w-3 h-3" />
                    <span>Монгол хэл дээр</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sim.embed && (
                  <button
                    onClick={() => setOpenId(isOpen ? null : sim.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
                  >
                    <MonitorPlay className="w-3.5 h-3.5" />
                    <span>{isOpen ? (mode === 'mn' ? 'Хаах' : 'Close') : (mode === 'mn' ? 'Энд нээх' : 'Open here')}</span>
                  </button>
                )}
                <a
                  href={sim.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{mode === 'mn' ? 'Шинэ цонхонд' : 'New tab'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {openSim && embedSrc(openSim) && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
              {openSim.provider} · {mode === 'mn' ? openSim.titleMn : openSim.titleEn}
            </span>
            <button
              onClick={() => setOpenId(null)}
              aria-label={mode === 'mn' ? 'Хаах' : 'Close'}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <iframe
            key={embedSrc(openSim)}
            src={embedSrc(openSim)}
            title={openSim.titleEn}
            className="w-full aspect-[4/3] sm:aspect-[16/10] min-h-[420px] bg-white"
            allow="fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
    </div>
  );
};

// --- YouTube lessons: thumbnail first, player loads on click ---

const VideoCard: React.FC<{ video: VideoLesson }> = ({ video }) => {
  const { mode } = useLanguage();
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 overflow-hidden flex flex-col">
      <div className="relative aspect-video bg-slate-900">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group"
            aria-label={`${mode === 'mn' ? 'Тоглуулах' : 'Play'}: ${video.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <CirclePlay className="w-12 h-12 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
            </span>
          </button>
        )}
      </div>
      <div className="p-3 space-y-1 flex-1">
        <div className="text-[10px] font-mono font-semibold text-red-600 dark:text-red-400">{video.channel}</div>
        <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{video.title}</div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          {mode === 'mn' ? video.focusMn : video.focusEn}
        </p>
      </div>
    </div>
  );
};

export const VideoLessonGrid: React.FC<{ videos: VideoLesson[] }> = ({ videos }) => {
  if (videos.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {videos.map(v => <VideoCard key={v.id} video={v} />)}
    </div>
  );
};
