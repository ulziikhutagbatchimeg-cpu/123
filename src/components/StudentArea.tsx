import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { HIGHLIGHT_HEADING, HIGHLIGHT_SUB } from '../lib/highlight';
import { StudentSelfCheck } from './StudentSelfCheck';
import { RewardStrip } from './RewardStrip';
import { WebRating } from './WebRating';
import { SectionSurvey } from './SectionSurvey';

// A block at the top of the student area that the student opens when they choose. Every block starts folded, and it is
// the only fold of what it holds. The accent colour sets one block apart from the others, such as the self-check; the
// summary (for example how many sections wait for answers) stays on the heading while the block is folded.
const FoldBlock: React.FC<{ title: string; accent?: boolean; summary?: React.ReactNode; children: React.ReactNode }> = ({ title, accent, summary, children }) => {
  const [open, setOpen] = useState(false);
  // The header is a bar of its own, so each block reads as one card whether it is folded or open
  const tone = accent
    ? 'border-violet-200 text-violet-700 hover:border-violet-400 dark:border-violet-900 dark:text-violet-300'
    : 'border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-800 dark:border-slate-800 dark:text-slate-300 dark:hover:text-teal-300';
  return (
    <div className="flex h-full flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-xs font-black uppercase tracking-wider shadow-sm transition-colors dark:bg-slate-900 ${tone}`}
      >
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span>{title}</span>
          {!open && summary}
        </span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {/* The content fills the block, so blocks side by side end at the same height. It stays mounted while folded, so
          it can tell the heading what waits inside. */}
      <div className={open ? 'flex flex-1 flex-col [&>*]:flex-1' : 'hidden'}>{children}</div>
    </div>
  );
};

// The page "Progress and rewards" of My progress: the student's results in every part (the self-check of the course), the
// rewards, then the section questions and the rating of the site. The pages to practise with are in the Practice and Study
// menus only, so this page holds no list of them.
export const StudentArea: React.FC = () => {
  const { mode } = useLanguage();
  const { programme, setActiveTab } = useApp();
  const mn = mode === 'mn';
  // How many studied sections wait for their question set, shown on the folded heading
  const [pendingSections, setPendingSections] = useState(0);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className={HIGHLIGHT_HEADING}>{mn ? 'Явц ба шагнал' : 'Progress and rewards'}</h2>
        <p className={`${HIGHLIGHT_SUB} mt-1 max-w-3xl leading-relaxed`}>
          {mn
            ? 'Хичээл, шалгалт, тоглоом, өөрийн үнэлгээний дүн чинь энд нэг дор. Багш ч мөн адил дүнг харна.'
            : 'Your results in lessons, tests, games and your self-check, in one place. Your teacher sees the same results.'}
        </p>
      </div>

      <StudentSelfCheck mn={mn} programme={programme} onOpenProgress={() => setActiveTab('curriculum')} />

      <RewardStrip stacked />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
        <FoldBlock
          title={mn ? 'Хэсгийн асуулга' : 'Section questions'}
          summary={
            pendingSections > 0 ? (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold normal-case tracking-normal text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                {mn ? `${pendingSections} хариулт хүлээж байна` : `${pendingSections} waiting`}
              </span>
            ) : undefined
          }
        >
          <SectionSurvey inFold onPending={setPendingSections} />
        </FoldBlock>
        <FoldBlock title={mn ? 'Веб сайтын үнэлгээ' : 'Rate this site'}>
          <WebRating />
        </FoldBlock>
      </div>
    </div>
  );
};
