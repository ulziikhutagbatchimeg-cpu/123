import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LabFrame, type LabNext } from './LabFrame';

// The teacher's reaction and mole simulations (public/labs), shown whole in a frame in the lesson's language, opened at the
// part the topic is about. The two labs have controls, so the student submits them for a score (LabFrame); the two
// animations play on their own and have nothing to submit.

// The chemical-reactions lab (reaction-lab.html): 1 the atom model (atoms rearrange, atom count before and after),
// 2 balancing 15 equations with coefficients, 3 classifying 15 reactions (combination, decomposition, displacement,
// double displacement, combustion)
export type ReactionTab = 'sim' | 'bal' | 'cls';
const REACTION_PART: Record<ReactionTab, number> = { sim: 1, bal: 2, cls: 3 };
export const ReactionLab: React.FC<{ tab: ReactionTab; height?: string } & LabNext> = ({ tab, height = 'h-[1100px]', onDone, nextHint }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const lang = mn ? 'mn' : 'en';
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? 'Симуляци: химийн урвалын лаборатори' : 'Simulation: chemical reactions lab'}</div>
      <LabFrame
        frameKey={`${lang}-${tab}`}
        src={`labs/reaction-lab.html?lang=${lang}&tab=${tab}`}
        title={{ mn: 'Химийн урвалын лаборатори', en: 'Chemical reactions lab' }}
        height={height}
        check="reactions"
        part={REACTION_PART[tab]}
        mn={mn}
        fit
        onDone={onDone}
        nextHint={nextHint}
      />
    </div>
  );
};

// The moles and stoichiometry lab (mole-lab.html), at IGCSE 0620 (whole-number Ar, 24 dm³ at r.t.p.) or AS & A Level 9701
// (Ar to one decimal place, r.t.p. and s.t.p., pV = nRT): 1 ionic equations and electron transfer, 2 mole conversions,
// 3 stoichiometry, 4 limiting reactant, 5 practice
export type MoleTab = 'ion' | 'mol' | 'sto' | 'lim' | 'pr';
const MOLE_PART: Record<MoleTab, number> = { ion: 1, mol: 2, sto: 3, lim: 4, pr: 5 };
export const MoleLab: React.FC<{ tab: MoleTab; level: 'igcse' | 'a'; height?: string } & LabNext> = ({
  tab,
  level,
  height = 'h-[1100px]',
  onDone,
  nextHint
}) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const lang = mn ? 'mn' : 'en';
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? 'Симуляци: моль ба стехиометрийн лаборатори' : 'Simulation: moles and stoichiometry lab'}</div>
      <LabFrame
        frameKey={`${lang}-${level}-${tab}`}
        src={`labs/mole-lab.html?lang=${lang}&level=${level}&tab=${tab}`}
        title={{ mn: 'Моль ба стехиометрийн лаборатори', en: 'Moles and stoichiometry lab' }}
        height={height}
        check="moles"
        part={MOLE_PART[tab]}
        mn={mn}
        fit
        onDone={onDone}
        nextHint={nextHint}
      />
    </div>
  );
};

// An animation that plays on its own (atoms-h2-o2.html: why 2H₂ + O₂ → 2H₂O needs its coefficients; reaction-types.html:
// the five reaction types as particle patterns). The frame takes the height of the page inside it.
type Bi = { mn: string; en: string };
export const SimAnimation: React.FC<{ file: 'atoms-h2-o2.html' | 'reaction-types.html'; title: Bi; height?: string }> = ({
  file,
  title,
  height = 'h-[640px]'
}) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const lang = mn ? 'mn' : 'en';
  const frameRef = useRef<HTMLIFrameElement>(null);
  const onLoad = () => {
    let doc: Document | null = null;
    try {
      doc = frameRef.current?.contentDocument ?? null;
    } catch {
      doc = null;
    }
    const win = doc?.defaultView;
    if (!doc?.body || !win) return;
    const body = doc.body;
    const size = () => {
      if (frameRef.current) frameRef.current.style.height = `${Math.ceil(body.getBoundingClientRect().height) + 4}px`;
    };
    size();
    new win.ResizeObserver(size).observe(body);
  };
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? `Хөдөлгөөнт загвар: ${title.mn}` : `Animation: ${title.en}`}</div>
      <iframe
        key={lang}
        ref={frameRef}
        src={`labs/${file}?lang=${lang}`}
        title={mn ? title.mn : title.en}
        loading="lazy"
        onLoad={onLoad}
        className={`w-full ${height} rounded-2xl border border-slate-200 bg-white`}
      />
    </div>
  );
};

// The simulations of each topic, in the order they show: IGCSE 0620 3.1, 3.2, 3.3, 6.1, 6.4, 9.4 and AS 9701 2.1–2.4, 4.1, 6.1
type TopicSim =
  | { kind: 'reactions'; tab: ReactionTab }
  | { kind: 'moles'; tab: MoleTab; level: 'igcse' | 'a' }
  | { kind: 'atoms' }
  | { kind: 'types' };
export const REACTION_SIM_TOPICS: Record<string, TopicSim[]> = {
  's-3-1': [{ kind: 'reactions', tab: 'bal' }, { kind: 'moles', tab: 'ion', level: 'igcse' }, { kind: 'atoms' }],
  's-3-2': [{ kind: 'moles', tab: 'mol', level: 'igcse' }],
  'top-3-1': [{ kind: 'moles', tab: 'sto', level: 'igcse' }],
  's-6-1': [{ kind: 'reactions', tab: 'sim' }, { kind: 'types' }],
  's-6-4': [{ kind: 'moles', tab: 'ion', level: 'igcse' }],
  's-9-4': [{ kind: 'reactions', tab: 'cls' }],
  'al-2.1': [{ kind: 'moles', tab: 'mol', level: 'a' }],
  'al-2.2': [{ kind: 'moles', tab: 'mol', level: 'a' }],
  'al-2.3': [{ kind: 'reactions', tab: 'bal' }, { kind: 'moles', tab: 'ion', level: 'a' }, { kind: 'atoms' }],
  'al-2.4': [{ kind: 'moles', tab: 'sto', level: 'a' }],
  'al-4.1': [{ kind: 'moles', tab: 'mol', level: 'a' }],
  'al-6.1': [{ kind: 'moles', tab: 'ion', level: 'a' }]
};

// The simulations of one topic, one under the other
export const TopicReactionSims: React.FC<{ topicId: string }> = ({ topicId }) => {
  const sims = REACTION_SIM_TOPICS[topicId];
  if (!sims) return null;
  return (
    <div className="mb-6 space-y-6">
      {sims.map(s =>
        s.kind === 'reactions' ? (
          <ReactionLab key={`r-${s.tab}`} tab={s.tab} />
        ) : s.kind === 'moles' ? (
          <MoleLab key={`m-${s.tab}`} tab={s.tab} level={s.level} />
        ) : s.kind === 'atoms' ? (
          <SimAnimation
            key="atoms"
            file="atoms-h2-o2.html"
            title={{ mn: 'урвалын үед атомууд дахин холбогдоно', en: 'atoms rearrange during a reaction' }}
          />
        ) : (
          <SimAnimation key="types" file="reaction-types.html" title={{ mn: 'химийн урвалын таван төрөл', en: 'five types of chemical reaction' }} />
        )
      )}
    </div>
  );
};
