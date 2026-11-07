// Each class has its own colour, by its grade (7 to 12), so the classes read apart at a glance in the teacher's lists and
// journal. Any other class is grey. The class strings are whole, so the build keeps every one of them.
export interface ClassTone {
  head: string; // a heading or tab background, with its tint
  text: string; // the class name's colour
  bar: string; // a full border colour, for a cell or a chip
  solid: string; // a solid background, for a thin accent bar
}

const CLASS_TONE: Record<string, ClassTone> = {
  '7': { head: 'bg-sky-500/15', text: 'text-sky-200', bar: 'border-sky-400', solid: 'bg-sky-400' },
  '8': { head: 'bg-cyan-500/15', text: 'text-cyan-200', bar: 'border-cyan-400', solid: 'bg-cyan-400' },
  '9': { head: 'bg-indigo-500/15', text: 'text-indigo-200', bar: 'border-indigo-400', solid: 'bg-indigo-400' },
  '10': { head: 'bg-violet-500/15', text: 'text-violet-200', bar: 'border-violet-400', solid: 'bg-violet-400' },
  '11': { head: 'bg-fuchsia-500/15', text: 'text-fuchsia-200', bar: 'border-fuchsia-400', solid: 'bg-fuchsia-400' },
  '12': { head: 'bg-orange-500/15', text: 'text-orange-200', bar: 'border-orange-400', solid: 'bg-orange-400' }
};

const GREY: ClassTone = { head: 'bg-slate-500/15', text: 'text-slate-300', bar: 'border-slate-500', solid: 'bg-slate-500' };

// The colour of a class such as 10A, by its grade number; a class with no grade number is grey
export const classTone = (cls: string): ClassTone => CLASS_TONE[cls.match(/^\d+/)?.[0] ?? ''] ?? GREY;
