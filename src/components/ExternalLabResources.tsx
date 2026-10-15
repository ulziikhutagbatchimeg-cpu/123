import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalSim, VideoLesson, Molecule } from '../data/externalLabResources';
import { ExternalLink, MonitorPlay, CirclePlay, X, Globe, PenTool } from 'lucide-react';

const PROVIDER_STYLES: Record<ExternalSim['provider'], string> = {
  PhET: 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/60',
  iWant2Study: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
  ChemCollective: 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/60',
  RSC: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
  Ptable: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  JavaLab: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
  Sketchfab: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60'
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
                {sim.credit && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug">{sim.credit}</p>
                )}
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
            <a
              href={openSim.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate hover:underline"
            >
              {openSim.credit ?? `${openSim.provider} · ${mode === 'mn' ? openSim.titleMn : openSim.titleEn}`}
            </a>
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
            allow="fullscreen; autoplay; xr-spatial-tracking"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
    </div>
  );
};

// --- MolView 3D molecule viewer with preset molecules ---

export const MoleculeViewer: React.FC<{ molecules: Molecule[] }> = ({ molecules }) => {
  const { mode } = useLanguage();
  const [cid, setCid] = useState<number>(molecules[0]?.cid ?? 0);
  const current = molecules.find(m => m.cid === cid) ?? molecules[0];

  if (!current) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_16rem] gap-3">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-black">
        <iframe
          key={current.cid}
          src={`https://embed.molview.org/v1/?mode=balls&cid=${current.cid}`}
          title={`MolView – ${current.nameEn}`}
          className="w-full aspect-[16/10] min-h-[320px]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5">
          {molecules.map(m => (
            <button
              key={m.cid}
              onClick={() => setCid(m.cid)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                m.cid === current.cid
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : 'bg-white dark:bg-slate-950/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {m.formula}
            </button>
          ))}
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
          <div className="text-sm font-bold text-slate-900 dark:text-white">{mode === 'mn' ? current.nameMn : current.nameEn}</div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">{current.formula}</div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            {mode === 'mn'
              ? 'Хулганаар эргүүлж, гүйлгэж томруулна. Атомын өнгө: C саарал, H цагаан, O улаан, N цэнхэр, Cl ногоон, S шар.'
              : 'Drag to rotate, scroll to zoom. Atom colours: C grey, H white, O red, N blue, Cl green, S yellow.'}
          </p>
        </div>
        <a
          href="https://app.molview.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>{mode === 'mn' ? 'MolView-д өөрөө молекул зурах' : 'Draw your own in MolView'}</span>
        </a>
        <p className="text-[10px] text-slate-400 dark:text-slate-500">3D: MolView · PubChem CID {current.cid}</p>
      </div>
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
