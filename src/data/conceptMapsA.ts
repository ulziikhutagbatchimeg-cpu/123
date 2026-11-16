import { b, link, node, type ChapterMap } from './conceptMapBuild';

// The concept maps of the A Level 9701 chapters (23–37), written by hand from the syllabus content of each topic, one chapter
// at a time with its lesson. Shown by components/ChapterConceptMap.tsx through CONCEPT_MAPS in conceptMaps.ts.

export const CONCEPT_MAPS_A: Record<string, ChapterMap> = {
  'al-ch-24': {
    centre: b('Electrochemistry', 'Электрохими'),
    bigIdea: b(
      'Each half-cell has an electrode potential measured against the standard hydrogen electrode; two half-cells make a cell whose E⦵cell tells which way electrons flow and whether a reaction is feasible, and the Faraday constant counts what electrolysis makes.',
      'Хагас элемент бүр стандарт устөрөгчийн электродтой харьцуулсан электродын потенциалтай; хоёр хагас элемент нэгдэж элемент болох ба E⦵cell нь электрон аль тийш урсах, урвал боломжтой эсэхийг заана. Фарадейн тогтмол электролизийн бүтээгдэхүүнийг тоолно.'
    ),
    nodes: [
      node('she', 'al-24.2', b('Standard electrode potential', 'Стандарт электродын потенциал'),
        b('Measured against the SHE: H₂ 100 kPa, H⁺ 1.00 mol dm⁻³, 298 K, Pt; E⦵ = 0.00 V', 'SHE-тэй харьцуулж хэмжинэ: H₂ 100 kPa, H⁺ 1.00 моль дм⁻³, 298 K, Pt; E⦵ = 0.00 V'),
        b('Ions of one element (Fe³⁺/Fe²⁺): a Pt electrode in both at 1.00 mol dm⁻³', 'Нэг элементийн ионууд (Fe³⁺/Fe²⁺): хоёулаа 1.00 моль дм⁻³ уусмалд Pt электрод')),
      node('cell', 'al-24.2', b('Cell potential', 'Эсийн потенциал'),
        b('E⦵cell = E⦵(positive) − E⦵(negative)', 'E⦵cell = E⦵(эерэг) − E⦵(сөрөг)'),
        b('Electrons flow from the more negative electrode to the more positive one', 'Электрон илүү сөрөг электродоос илүү эерэг рүү урсана')),
      node('feasible', 'al-24.2', b('Feasibility and strength', 'Боломж ба хүч'),
        b('A positive E⦵cell: feasible, and ΔG⦵ = −nE⦵cellF is negative', 'E⦵cell эерэг бол боломжтой, ΔG⦵ = −nE⦵cellF сөрөг'),
        b('More positive E⦵: stronger oxidising agent; more negative: stronger reducing agent', 'E⦵ илүү эерэг: хүчтэй исэлдүүлэгч; илүү сөрөг: хүчтэй ангижруулагч')),
      node('nernst', 'al-24.2', b('Nernst equation', 'Нернстийн тэгшитгэл'),
        b('E = E⦵ + (0.059/z) log([oxidised]/[reduced])', 'E = E⦵ + (0.059/z) log([исэлдсэн]/[ангижирсан])'),
        b('Less Cu²⁺: E(Cu²⁺/Cu) less positive, the Zn–Cu cell voltage falls', 'Cu²⁺ багасвал E(Cu²⁺/Cu) бага эерэг болж, Zn–Cu элементийн хүчдэл буурна')),
      node('electrolysis', 'al-24.1', b('Electrolysis products', 'Электролизийн бүтээгдэхүүн'),
        b('Depend on the state of the electrolyte, E⦵ and concentration', 'Электролитийн төлөв, E⦵ ба концентрацаас хамаарна'),
        b('Concentrated NaCl(aq): Cl₂ at the anode; dilute: O₂', 'NaCl-ийн төвлөрсөн уусмал: анод дээр Cl₂; шингэн: O₂')),
      node('faraday', 'al-24.1', b('Faraday constant', 'Фарадейн тогтмол'),
        b('Q = It; F = Le = 96 500 C mol⁻¹; moles of electrons = Q ÷ F', 'Q = It; F = Le = 96 500 Кл моль⁻¹; электроны моль = Q ÷ F'),
        b('The mass of copper plated and the charge passed give L', 'Бүрсэн зэсийн масс ба дамжсан цэнэгээс L-ийг олно'))
    ],
    links: [
      link('she', 'cell', 'two half-cells combine into', 'хоёр хагас элемент нэгдэж'),
      link('cell', 'feasible', 'its sign decides', 'тэмдэг нь шийднэ'),
      link('nernst', 'cell', 'non-standard concentrations change', 'стандарт бус концентраци өөрчилнө'),
      link('feasible', 'electrolysis', 'E⦵ values help predict', 'E⦵ утга урьдчилан таамаглахад тусална'),
      link('faraday', 'electrolysis', 'counts the amount made in', 'бүтээгдэхүүний хэмжээг тоолно')
    ]
  }
};
