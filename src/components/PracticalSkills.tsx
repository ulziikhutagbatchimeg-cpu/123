import React from 'react';

// The practical exam skills tab. It is a summary in our own words of Cambridge's practical-science factsheet, with
// practice tips for the lab. The factsheet itself is not copied; the official 9701 papers are linked, not reproduced.
const OFFICIAL_9701_PAST_PAPERS =
  'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-chemistry-9701/past-papers/';

const SECTION = 'p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2';
const HEADING = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';

export const PracticalSkills: React.FC<{ mn: boolean }> = ({ mn }) => (
  <div className="space-y-4">
    <div className={SECTION}>
      <div className={HEADING}>{mn ? 'Яагаад чухал вэ' : 'Why practical work counts'}</div>
      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        {mn
          ? 'Их сургуулиуд практик ажлын нотолгоо хайдаг. Практик ур чадвар нь зөвхөн онолыг биш, шинжлэх ухаан хэрхэн судлагддагийг ойлгож байгааг харуулна.'
          : 'Universities look for evidence of practical work. Practical skills show that you understand how science is investigated, not only the theory.'}
      </p>
    </div>

    <div className={SECTION}>
      <div className={HEADING}>{mn ? 'Бүтээх ур чадвар' : 'Skills you build'}</div>
      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <li>{mn ? 'Нарийвчлалтай хэмжилт, анхаарлтай ажиглалт' : 'Accurate measurement and careful observation'}</li>
        <li>{mn ? 'Тэвчээр' : 'Perseverance'}</li>
        <li>{mn ? 'Багаар ажиллах, харилцах' : 'Teamwork and communication'}</li>
      </ul>
    </div>

    <div className={SECTION}>
      <div className={HEADING}>{mn ? 'Хэрхэн үнэлэгдэх вэ' : 'How the practical is assessed'}</div>
      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        {mn
          ? 'IGCSE ба O Level-ийн сургууль практик шалгалт эсвэл бичгийн хувилбарыг сонгоно. Шалгалтыг хэд хэдэн өдөр хуваан явуулж болно.'
          : 'For IGCSE and O Level, a school chooses between a practical test and a written alternative. The practical can run over several days, so every student has space.'}
      </p>
    </div>

    <div className={SECTION}>
      <div className={HEADING}>{mn ? 'Лабораторийн зөвлөгөө' : 'Lab tips'}</div>
      <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <li>{mn ? 'Аргачлалыг бүхэлд нь уншсаны дараа л багаж хүр.' : 'Read the whole method before you touch the apparatus.'}</li>
        <li>{mn ? 'Ажиглалтаа явцад нь бич: юу харснаа, харин яагаад гэдгийг биш.' : 'Write observations as they happen: what you saw, not why.'}</li>
        <li>{mn ? 'Уншилтыг нэгж, зөв аравтын оронтойгоор бич.' : 'Record readings with units and the correct number of decimal places.'}</li>
        <li>{mn ? 'Давтан хэмжиж, хазайсан үр дүнг хай.' : 'Repeat readings and look for anomalous results.'}</li>
        <li>{mn ? 'Аюулгүй байдлын эрсдэлийг нэрлээд хэрхэн хянахаа бич.' : 'Name each safety risk and how you control it.'}</li>
      </ol>
    </div>

    <div className={SECTION}>
      <div className={HEADING}>{mn ? 'Албан ёсны шалгалт' : 'Official papers'}</div>
      <a
        href={OFFICIAL_9701_PAST_PAPERS}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-bold text-emerald-700 dark:text-teal-300 hover:underline"
      >
        {mn ? '9701-ийн албан ёсны шалгалтын материал (практик хуудсууд орно) →' : 'Official 9701 past papers, including the practical papers →'}
      </a>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {mn
          ? 'Энэ хуудас Cambridge-ийн танилцуулгыг өөрийн үгээр товчилсон. Эх текстийг хуулаагүй.'
          : 'This page summarises Cambridge’s practical-science factsheet in our own words. The original text is not copied.'}
      </p>
    </div>
  </div>
);
