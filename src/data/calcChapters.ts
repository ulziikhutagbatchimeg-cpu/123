// The chapters of the Calculations hub: the chapters that involve calculations, in the order the hub lists them. The refs are
// matched against the syllabus refs of the worked examples, the practice problems and the calculators, so each chapter
// shows its own. A chapter without its own examples or calculators shows an empty note and the lesson link instead.
export const CALC_CHAPTERS: Array<{ id: string; refs: string[] }> = [
  { id: 'ch-stoichiometry', refs: ['Topic 3', '0620/3.'] },
  { id: 'ch-electrochemistry', refs: ['Topic 4', '0620/4.'] },
  { id: 'ch-energetics', refs: ['Topic 5', '0620/5.'] },
  { id: 'ch-reactions', refs: ['Topic 6', '0620/6.'] },
  { id: 'ch-acids-bases', refs: ['Topic 7', '7.2', '0620/7.'] },
  { id: 'al-ch-2', refs: ['9701/2.'] },
  { id: 'al-ch-4', refs: ['9701/4.'] },
  { id: 'al-ch-5', refs: ['9701/5.'] },
  { id: 'al-ch-6', refs: ['9701/6.'] },
  { id: 'al-ch-7', refs: ['9701/7.'] },
  { id: 'al-ch-8', refs: ['9701/8.'] }
];
